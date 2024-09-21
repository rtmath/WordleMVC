using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using WordleMVC.Models;

namespace WordleMVC.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;
        private static readonly HttpClient _client = new HttpClient();

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public async Task<int> RetrieveWordID()
        {
            var response = await _client.GetAsync("http://localhost:5272/api/word");

            bool succeeded = int.TryParse(await response.Content.ReadAsStringAsync(), out int i);
            return (succeeded) ? i : 0;
        }

        [HttpPost]
        public async Task<string?> CheckGuess([FromBody] GuessModel guessModel)
        {
            var response = await _client.PostAsync(
                "http://localhost:5272/api/word/",
                new StringContent(JsonSerializer.Serialize(guessModel), Encoding.UTF8, "application/json")
            );

            return await response.Content.ReadAsStringAsync();
        }
    }
}