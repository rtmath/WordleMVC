using Microsoft.AspNetCore.Mvc;
using WordleAPI.Data;

namespace WordleAPI.Controllers
{
    [Route("api/word")]
    [ApiController]
    public class WordController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public WordController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var words = _context.Words.ToList();
            return Ok(words);
        }

        [HttpPost("{id}")]
        public IActionResult CheckWord([FromRoute] int id, [FromBody] string guess)
        {
            if (id == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
