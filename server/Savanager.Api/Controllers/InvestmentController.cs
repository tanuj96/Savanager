using Microsoft.AspNetCore.Mvc;
using Savanager.Api.Models;
using Savanager.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Savanager.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class InvestmentController : ControllerBase
    {
        private readonly SavanagerDbContext _context;

        public InvestmentController(SavanagerDbContext context)
        {
            _context = context;
        }

        // GET: api/Investment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Investment>>> GetInvestments()
        {
            return await _context.Investments.ToListAsync();
        }

        // GET: api/Investment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Investment>> GetInvestment(int id)
        {
            var investment = await _context.Investments.FindAsync(id);

            if (investment == null)
            {
                return NotFound();
            }

            return investment;
        }

        // POST: api/Investment
        [HttpPost]
        public async Task<ActionResult<Investment>> CreateInvestment(Investment investment)
        {
            _context.Investments.Add(investment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvestment), new { id = investment.Id }, investment);
        }

        // PUT: api/Investment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvestment(int id, Investment investment)
        {
            if (id != investment.Id)
            {
                return BadRequest();
            }

            _context.Entry(investment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvestmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Investment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvestment(int id)
        {
            var investment = await _context.Investments.FindAsync(id);
            if (investment == null)
            {
                return NotFound();
            }

            _context.Investments.Remove(investment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<InvestmentType>>> GetInvestmentTypes()
        {
            return await _context.InvestmentTypes.ToListAsync();
        }

        private bool InvestmentExists(int id)
        {
            return _context.Investments.Any(e => e.Id == id);
        }
    }
}
