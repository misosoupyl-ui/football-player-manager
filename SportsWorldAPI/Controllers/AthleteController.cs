using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController : ControllerBase
{
    private readonly SportsWorldContext _sportsWorldContext;

    public AthleteController(SportsWorldContext sportsWorldContext)
    {
        _sportsWorldContext = sportsWorldContext;
    }

    // === GET /athlete ===
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            var athletes = await _sportsWorldContext.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === GET /athlete/{id} ===
    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            if (athlete == null) return NotFound();
            return Ok(athlete);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === POST /athlete ===
    [HttpPost]
    public async Task<ActionResult<Athlete>> Post(Athlete newAthlete)
    {
        try
        {
            _sportsWorldContext.Athletes.Add(newAthlete);
            await _sportsWorldContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = newAthlete.Id }, newAthlete);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === PUT /athlete ===
    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            _sportsWorldContext.Athletes.Entry(editedAthlete).State = EntityState.Modified;
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // === DELETE /athlete/{id} ===
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var athlete = await _sportsWorldContext.Athletes.FindAsync(id);
            if (athlete == null) return NotFound();

            _sportsWorldContext.Athletes.Remove(athlete);
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }
}
