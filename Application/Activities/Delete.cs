using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
           public class Command : IRequest
                {
        
                 public Guid Id { get; set; }
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
                        var activity =await _context.Activites.FindAsync(request.Id);
                         if(activity == null) throw new Exception("No activity found with the given id");
                      
                        _context.Remove(activity);
        
                        var result =await _context.SaveChangesAsync() > 0;
        
                        if(result) return Unit.Value;
                       
                       throw new Exception("Problem saving data");
        
                    }
                }
    }
}