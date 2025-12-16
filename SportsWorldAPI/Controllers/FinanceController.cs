using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController : ControllerBase
{
    private readonly SportsWorldContext _sportsWorldContext;

    public FinanceController(SportsWorldContext sportsWorldContext)
    {
        _sportsWorldContext = sportsWorldContext;
    }

    // synkroniserer finance basert på athlete purchasestatus. 
    // Athletes er "source of truth" for kjøp.
    // Mens finance holder oversikt over budsjett/remaining
    private async Task SyncFinanceFromAthletes(Finance finance)
    {
        // Hent alle purchased athletes
        var purchasedAthletes = await _sportsWorldContext.Athletes
            .Where(a => a.PurchaseStatus == true)
            .ToListAsync();

        // Regner antall kjøp og titalt brukt beløp
        int purchasedCount = purchasedAthletes.Count;
        decimal spent = purchasedAthletes.Sum(a => (decimal)a.Price);

        // Totalbudsjett = penger igjen + penger brukt
        decimal totalBudget = finance.MoneyLeft + finance.MoneySpent;

        // Oppdaterer finance basert på nye beregninger
        finance.NumberOfPurchases = purchasedCount;
        finance.MoneySpent = spent;
        finance.MoneyLeft = totalBudget - spent;

        // ekstra sikkerhet, for at verdier ikke blir negative
        if (finance.MoneyLeft < 0) finance.MoneyLeft = 0;
        if (finance.MoneySpent < 0) finance.MoneySpent = 0;
        if (finance.NumberOfPurchases < 0) finance.NumberOfPurchases = 0;
    }

    // === GET /finance ===
    // Returnerer liste, men synker vi først
    [HttpGet]
    public async Task<ActionResult<List<Finance>>> Get()
    {
        try
        {
            List<Finance> finances = await _sportsWorldContext.Finances.ToListAsync();

            // Hvis dere ikke har en finance-rad enda 
            if (finances.Count == 0)
                return Ok(finances);

            // Dere har kun 1 rad - synk den
            Finance finance = finances[0];
            await SyncFinanceFromAthletes(finance);

            _sportsWorldContext.Finances.Update(finance);
            await _sportsWorldContext.SaveChangesAsync();

            // returnerer samme format som før (liste)
            return Ok(new List<Finance> { finance });
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === GET /finance/{id} ===
    [HttpGet("{id}")]
    public async Task<ActionResult<Finance>> Get(int id)
    {
        try
        {
            Finance? finance = await _sportsWorldContext.Finances.FindAsync(id);

            if (finance == null)
                return NotFound();

            await SyncFinanceFromAthletes(finance);

            _sportsWorldContext.Finances.Update(finance);
            await _sportsWorldContext.SaveChangesAsync();

            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === POST /finance ===
    [HttpPost]
    public async Task<ActionResult> Post(Finance newFinance)
    {
        try
        {
            _sportsWorldContext.Finances.Add(newFinance);
            await _sportsWorldContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === PUT /finance ===
// brukes for å justere lån (moneyleft)
// numberofpruchase og moneyspent skal alltid komme fra athletes, og ikke overskrves fra frontend.
[HttpPut]
public async Task<IActionResult> Put(Finance editedFinance)
{
    try
    {
        // forutsetter har bare 1 rad i Finance-tabellen
        Finance? finance = await _sportsWorldContext.Finances.FirstOrDefaultAsync();

        if (finance == null)
        {
            return NotFound();
        }

        // kun Moneyleft lar vi frontend endre
        finance.MoneyLeft = editedFinance.MoneyLeft;

        // Synk resten fra Athletes (source of truth)
        await SyncFinanceFromAthletes(finance);

        _sportsWorldContext.Finances.Update(finance);
        await _sportsWorldContext.SaveChangesAsync();

        return Ok(finance);
    }
    catch
    {
        return StatusCode(500);
    }
}

    // === DELETE /finance/{id} ===
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Finance? finance = await _sportsWorldContext.Finances.FindAsync(id);

            if (finance == null)
                return NotFound();

            _sportsWorldContext.Finances.Remove(finance);
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }
}
