namespace Quiz_CSharp.Data.Migrations
{
    using Quiz_CSharp.Data.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Quiz_CSharp.Data.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Quiz_CSharp.Data.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Questions.AddOrUpdate(
                q=> q.AQuestion,
                new Question(0, "Who wrote <i>The Tales of Hoffman</i>?"),
                new Question(1, "Which composer was born in Salzburg, Austria?"),
                new Question(2, "Who wrote the piano concerto 'Songs Without Words'?"),
                new Question(3, "Which composer/opera is responsible for this image? <br/> <br/> <img src='http://b.vimeocdn.com/ts/320/454/320454515_640.jpg' with='400' height='200px' /> <br/>")
                );
            context.Answers.AddOrUpdate(
                a=> a.AnAnswer,
                new Answer(0, "Jacques Offenbach", true),
                new Answer(0, "Wolfgang Amadeus Mozart", false),
                new Answer(0, "Johann Sebastian Bach", false),
                new Answer(0, "Jules Massenet", false),
                new Answer(1, "Wolfgang Amadeus Mozart", true),
                new Answer(1, "Johann Sebastian Bach", false),
                new Answer(1,"Jules Massenet", false),
                new Answer(1,"Richard Wagner", false),
                new Answer(2,"Felix Mendelssohn",true),
                new Answer(2,"Fredric Handel",false),
                new Answer(2,"Richard Wagner",false),
                new Answer(2,"Giuseppe Verdi",false),
                new Answer(3, "Richard Wagner –  The Ring Cycle",true),
                new Answer(3, "Gaetano Donizetti – <i>Maria Stuarda </i>",false),
                new Answer(3, "Vincenzo Bellini - <i>I puritani</i>",false),
                new Answer(3, "Jules Massenet – <i>Werther </i>",false)
                );
        }
    }
}
