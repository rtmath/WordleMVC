namespace WordleAPI.Models
{
    public enum Match : int
    {
        NotInWord = 0,
        SomewhereInWord = 1,
        ExactPosition = 2
    };

    public class WordModel
    {
        public int Id { get; set; }
        public string Chars { get; set; } = String.Empty;

        public int[] CompareWith(string guess)
        {
            guess = guess.ToUpper();
            string chars = this.Chars.ToUpper();

            // Super duper idiomatic C# code..
            int[] Matches = new int[5];

            for (int i = 0; i < chars.Length; i++)
            {
                if (guess[i] == chars[i])
                {
                    Matches[i] = (int)Match.ExactPosition;
                }
                else if (chars.Contains(guess[i]))
                {
                    Matches[i] = (int)Match.SomewhereInWord;
                }
                else
                {
                    Matches[i] = (int)Match.NotInWord;
                }
            }

            return Matches;
        }
    }
}
