using Quiz_CSharp.Data;
using Quiz_CSharp.Data.Models;
using Quiz_CSharp.Web.Adapters.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Quiz_CSharp.Web.Adapters
{
    public class QuestionAdapter : IQuestion
    {
        public QuestionVM GetQuestion(int id)
        {
            ApplicationDbContext Db = new ApplicationDbContext();
            QuestionVM VM = new QuestionVM();
            VM.Question = Db.Questions.Where(q => q.Id == id).FirstOrDefault();
            VM.Answers = Db.Answers.Where(q => q.QuestionId == id).ToList();
            return VM;
        }

        public List<int> GetAllQuestions()
         {
            ApplicationDbContext Db = new ApplicationDbContext();
            List<Question> Questions = Db.Questions.ToList();
            List<int> QuestionIds = new List<int>();
            foreach (var q in Questions)
            {
                QuestionIds.Add(q.Id);
            }
            return QuestionIds;
        }
        public int CreateQuestion(QuestionVM vM)
        {
            Question NewQuestion = new Question(vM.Question.AQuestion);
            ApplicationDbContext Db = new ApplicationDbContext();
            Db.Questions.Add(NewQuestion);
            Db.SaveChanges();
            return NewQuestion.Id;
        }
        public void AddAnswers(QuestionVM vm)
        {
            ApplicationDbContext Db = new ApplicationDbContext();
            foreach (var answer in vm.Answers)
	        {
                Db.Answers.Add(answer);
	        }
            Db.SaveChanges(); 
        }

        public void UpdateQuestion(int id, Question question)
        {
            throw new NotImplementedException();
        }

        public void DeleteQuestion(int id)
        {
            ApplicationDbContext Db = new ApplicationDbContext();
            Question Question = Db.Questions.Where(q => q.Id == id).FirstOrDefault();
            List<Answer> Answers = Db.Answers.Where(a => a.QuestionId == id).ToList();
            foreach (var a in Answers)
            {
            Db.Answers.Remove(a);    
            }
            Db.SaveChanges();
            Db.Questions.Remove(Question);
            Db.SaveChanges();
        }
        public QuestionVM EditQuestion(QuestionVM VM)
        {
            ApplicationDbContext Db = new ApplicationDbContext();
            Question MyQuestion = Db.Questions.Where(r => r.Id == VM.Question.Id).FirstOrDefault();
            MyQuestion.AQuestion = VM.Question.AQuestion;
            Db.SaveChanges();
            int Answer0Id = VM.Answers[0].Id;
            int Answer1Id = VM.Answers[1].Id;
            int Answer2Id = VM.Answers[2].Id;
            int Answer3Id = VM.Answers[3].Id;
            Answer Answer0 = Db.Answers.Where(a => a.Id == Answer0Id).FirstOrDefault();
            Answer Answer1 = Db.Answers.Where(a => a.Id == Answer1Id).FirstOrDefault();
            Answer Answer2 = Db.Answers.Where(a => a.Id == Answer2Id).FirstOrDefault();
            Answer Answer3 = Db.Answers.Where(a => a.Id == Answer3Id).FirstOrDefault();
            Answer0.AnAnswer = VM.Answers[0].AnAnswer;
            Answer1.AnAnswer = VM.Answers[1].AnAnswer;
            Answer2.AnAnswer = VM.Answers[2].AnAnswer;
            Answer3.AnAnswer = VM.Answers[3].AnAnswer;
            Db.SaveChanges();
            return VM;
        }
    }
}