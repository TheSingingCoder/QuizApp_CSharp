using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_CSharp.Data.Models
{
    public class QuestionVM
    {
        public Question Question { get; set; }
        public List<Answer> Answers { get; set; }
    }
}
