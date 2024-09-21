namespace WordleAPI.Models
{
    public class GuessModel
    {
        public int CorrectWordID { get; set; }
        public string Guess { get; set; } = string.Empty;
    }
}
