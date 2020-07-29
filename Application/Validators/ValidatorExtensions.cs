using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty().MinimumLength(9).
                WithMessage("Password Must contain 9 letters or more").
                Matches("[A-Z]").WithMessage("Password Must Contain one Capital Letter").
                Matches("[a-z]").WithMessage("Password Must Contain one small Letter").
                Matches("[0-9]"). WithMessage("Password Must Contain one number").
                 Matches("[^A-Za-z0-9]"). WithMessage("Password Must Contain a non-alphanumeric character");
               
               return options;
        }
    }
}