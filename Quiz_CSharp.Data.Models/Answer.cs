using Quiz_CSharp.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_CSharp.Data
{
    public class Answer
    {
        public int Id { get; set; }
        public virtual Question Question { get; set; }
        public int QuestionId { get; set; }
        public string AnAnswer { get; set; }
        public bool IsCorrect { get; set; }
        Answer()
        {
        }
        public Answer(int questionId, string anAnswer, bool correct)
        {
            QuestionId = questionId;
            AnAnswer = anAnswer;
            IsCorrect = correct;
        }
    }
}
