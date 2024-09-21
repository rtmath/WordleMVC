using Microsoft.AspNetCore.Mvc;
using WordleAPI.Data;
using WordleAPI.Models;

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
        public IActionResult WordID()
        {
            var words = _context.Words.ToList();
            return Ok(words[DateTime.Now.Day % words.Count].Id);
        }

        [HttpPost]
        public IActionResult CheckWord([FromBody] GuessModel guessModel)
        {
            if (guessModel.Guess.Length != 5) { return BadRequest(); }

            var word = _context.Words.SingleOrDefault(x => x.Id == guessModel.CorrectWordID);
            if (word == null) { return NotFound(); }

            return Ok(word.CompareWith(guessModel.Guess));
        }
    }
}