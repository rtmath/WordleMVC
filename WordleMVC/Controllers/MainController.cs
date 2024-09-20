using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
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
        public int RetrieveWordID()
        {
            /* To be implemented */

            return 1;
        }

        [HttpPost]
        public async Task<string?> CheckGuess([FromBody] int id, [FromBody] string guess)
        {
            Console.WriteLine(id);
            Console.WriteLine(guess);
            HttpRequestMessage msg = new HttpRequestMessage();
            msg.Method = HttpMethod.Get;
            msg.RequestUri = new Uri("http://localhost:5272/api/word");
            var response = _client.Send(msg);

            return await response.Content.ReadAsStringAsync();
        }
    }
}