using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_CSharp.Data.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string AQuestion { get; set; }
        public string QuestionType { get; set; }
        Question()
        {
        }
        public Question(string question)
        {
            AQuestion = question;
            QuestionType = "multiple";
        }
        public Question(int id, string question)
        {
            Id = id;
            AQuestion = question;
            QuestionType = "multiple";
        }
    }
}
