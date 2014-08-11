using Quiz_CSharp.Data;
using Quiz_CSharp.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_CSharp.Web.Adapters.Interfaces
{
    public interface IQuestion
    {
        QuestionVM GetQuestion(int id);
        List<int> GetAllQuestions();
        int CreateQuestion(QuestionVM vM);
        void UpdateQuestion(int id, Question question);
        void DeleteQuestion(int id);
        void AddAnswers(QuestionVM vm);
        QuestionVM EditQuestion(QuestionVM VM);
    }
}
