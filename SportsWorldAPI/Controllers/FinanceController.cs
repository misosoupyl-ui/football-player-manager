using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController(SportsWorldContext _sportsWorldContext) : ControllerBase
{

  // ===GET / finance===
  // Henter alle finance rader (bare en rad hos oss)


 [HttpGet] 
 public async Task<ActionResult<List<Finance>>> Get()
    {
        try
        {
            // Henter alle rader fra finance tabellen
            List<Finance> finances = await _sportsWorldContext.Finances.ToListAsync();
            // 200
            return Ok(finances);
        }
        catch
        {
            return StatusCode(500);
        }
    }


// ===GET / finance / {id}
// Henter finance rad basert på id

[HttpGet("{id}")]
public async Task<ActionResult<Finance>> Get(int id)
    {
        try
        {
            // Forsøker å finne finance raden med riktig id
            Finance? finance = await _sportsWorldContext.Finances.FindAsync(id);

            if (finance != null)
            {
                // Fant, 200 ok med objektet
                return Ok(finance);
            }
            else
            {
                // Fant ikke, 404 not founf
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }


// ===POST / finance=== 
// Oppretter en ny finance-rad
// Trenger egentlig ikke i finance men vi må fortsatt vise at vi kan full crud

[HttpPost]
public async Task<ActionResult> Post(Finance newFinance)
    {
        try
        {
            // Legger til objektet i context
            _sportsWorldContext.Finances.Add(newFinance);
            await _sportsWorldContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }


// ===PUT / finance===
// Oppdaterer, eks MoneyLeft, NumberOfPurchases og MoneySpent

[HttpPut]
public async Task<IActionResult> Put(Finance editedFinance)
    {
        try
        {
            _sportsWorldContext.Finances.Entry(editedFinance).State = EntityState.Modified;
            await _sportsWorldContext.SaveChangesAsync();
            return Ok(editedFinance);// returnerer 200 ok med oppdatert objekt
        }
        catch
        {
            return StatusCode(500);
        }
    }



// ===DELETE / finance / {id}===

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Finance? finance = await _sportsWorldContext.Finances.FindAsync(id);

            if (finance != null)
            {
                _sportsWorldContext.Finances.Remove(finance);
                await _sportsWorldContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

}
