using System;
using System.Diagnostics;

public class SignupViewModel
{
    public int UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? UserPassword { get; set; }
    public string? UserConfirmPassword { get; set; }

/*    public static void PrintMethod(SignupViewModel model)
    {
        string userData = model.UserId.ToString()+" "+ model.FirstName.ToString()+" "+model.LastName.ToString()+" "+
            model.Email.ToString()+" "+model.UserPassword.ToString();
        Debug.Print(userData);
    }*/
}
