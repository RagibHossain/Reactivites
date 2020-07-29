using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {

            public string DisplayName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string UserName { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.UserName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _context = context;

            }


            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.AnyAsync(x => x.Email == request.Email)) throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already Exists" });
                if (await _context.Users.AnyAsync(x => x.UserName == request.UserName)) throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already Exists" });

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Email,
                };


                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = null
                    };
                }
                // if(result) return Unit.Value;

                throw new Exception("Problem Creating user");

            }
        }
    }
}