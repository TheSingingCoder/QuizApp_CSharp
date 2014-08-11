using Quiz_CSharp.Data;
using Quiz_CSharp.Data.Models;
using Quiz_CSharp.Web.Adapters;
using Quiz_CSharp.Web.Adapters.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Quiz_CSharp.Web.Controllers
{
    public class ApiQuestionController : ApiController
    {
        private IQuestion _adapter;
        public ApiQuestionController()
        {
            _adapter = new QuestionAdapter();
        }
        public IHttpActionResult GET(int id = -1)
        {
            if (id == -1)
            {
                return Ok(_adapter.GetAllQuestions());
            }
            else
            {
                return Ok(_adapter.GetQuestion(id));
            }
        }
        [HttpPost]
        public IHttpActionResult POST(QuestionVM vm)
        {
            if (vm.Question.Id == 0)
            {
                ;
                return Ok(_adapter.CreateQuestion(vm));
            }
            else
            {
                _adapter.AddAnswers(vm);
                return Ok();
            }
        }
        [HttpDelete]
        public IHttpActionResult DELETE(int id)
        {
            _adapter.DeleteQuestion(id);
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult PUT(QuestionVM VM)
        {
            return Ok(_adapter.EditQuestion(VM));
        }
    }
}
