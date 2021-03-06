using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic
                var activity = await _context.Activites.FindAsync(request.Id);

                if(activity == null) throw new RestException(HttpStatusCode.NotFound,new {activity ="Activity Not Found"});

                var user = await _context.Users.SingleOrDefaultAsync( x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.AppUserId == user.Id && x.ActivityId == activity.Id);
                 
                 if(attendance != null) throw new RestException(HttpStatusCode.BadRequest,new {attendance = "Attendance already Exists"});

                 attendance = new UserActivity{
                     Activity = activity,
                     AppUser = user,
                     DateJoined = DateTime.Now,
                     IsHost = false
                 };
                 _context.UserActivities.Add(attendance);
                 
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Unit.Value;

                throw new Exception("Problem saving data");

            }
        }
    }
}