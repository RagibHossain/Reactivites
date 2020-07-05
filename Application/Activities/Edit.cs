using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
           public class Command : IRequest
          {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
          }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
        
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var acitivity =await _context.Activites.FindAsync(request.Id);
                        if(acitivity == null ) throw new Exception("No activity find with the given id");

                        acitivity.Title = request.Title ?? acitivity.Title;
                        acitivity.Description = request.Description ?? acitivity.Description;
                        acitivity.Category = request.Category ?? acitivity.Category;
                        acitivity.Date = request.Date ?? acitivity.Date;
                        acitivity.City = request.City ?? acitivity.City;
                        acitivity.Venue = request.Venue ?? acitivity.Venue;

                        var result =await _context.SaveChangesAsync() > 0;
        
                        if(result) return Unit.Value;
                       
                       throw new Exception("Problem saving data");
        
                    }
                }
    }
}