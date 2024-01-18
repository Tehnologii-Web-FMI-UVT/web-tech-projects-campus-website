using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;

namespace web_project.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;


        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult MainPage(SignupViewModel model)
        {
            return View(model);
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email,string userPassword)
        {
            try
            {
                ApplicationDbContext applicationDbContext = new ApplicationDbContext();
                bool isValidUser = true;
                isValidUser = applicationDbContext.CheckIfUserExists(email, userPassword);

                if (isValidUser)
                {
                    Debug.Print($"User with email '{email}' exists and it is logged in right now");

                    //SignupViewModel user = applicationDbContext.GetUserByEmail(email);
                    //TempData["UserLoggedIn"] = user;

                    TempData["EmailUserLoggedIn"] = email;
                    return RedirectToAction("MainPage");
                }
                else
                {
                    Debug.Print($"User with email '{email}' does not exist");
                    TempData["AlertMessage"] = "User does not exist";
                    return View();
                }
            }
            catch (Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View();
            }
        }

        [HttpGet]
        public IActionResult Signup()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Signup(SignupViewModel model)
        {
            try
            {
                ApplicationDbContext applicationDbContext = new ApplicationDbContext();
                applicationDbContext.AddUser(model);

                return RedirectToAction("Login");
            }
            catch(Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View(model);
            }

            
        }

        [HttpGet]
        public IActionResult Profile(SignupViewModel model)
        {
            try
            {
                string email = string.Empty;

                if (TempData.ContainsKey("EmailUserLoggedIn") && TempData["EmailUserLoggedIn"] != null)
                {
                    email = TempData["EmailUserLoggedIn"].ToString();
                }
                else
                {
                    TempData["AlertMessageProfile"] = "User not logged in, cannot access Profile page";
                }

                ApplicationDbContext applicationDb = new ApplicationDbContext();
                string id = applicationDb.GetUserIdByEmail(email);

                //string id = TempData["UserProfileID"] as string ?? Request.Query["id"];*/

                if (!String.IsNullOrEmpty(id)) { 

                    ApplicationDbContext applicationDbContext = new ApplicationDbContext();
                    SignupViewModel user= applicationDbContext.DisplayUserInformation(id);

                    TempData["UserProfileId"] = id;

                    return View(user);
                }
                else
                {
                    //return RedirectToAction("MainPage");
                    throw new NullReferenceException("Id for the user that wants profile changed is null");
                }
            }
            catch(Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View();
            }
        }

        [HttpPost]
        public IActionResult Profile(SignupViewModel model, string newPassword)
        {
            try
            {
                //string email = TempData["EmailUserLoggedIn"].ToString();

                ApplicationDbContext applicationDb = new ApplicationDbContext();
                string idStored = TempData["UserProfileId"].ToString();
                SignupViewModel modelTakenFromTemp= applicationDb.DisplayUserInformation(idStored);

                model.UserId = modelTakenFromTemp.UserId;
                model.FirstName = modelTakenFromTemp.FirstName;
                model.LastName = modelTakenFromTemp.LastName;
                model.Email = modelTakenFromTemp.Email;
                model.UserPassword = modelTakenFromTemp.UserPassword;
                model.UserConfirmPassword = modelTakenFromTemp.UserConfirmPassword;

                //string id = TempData["UserProfileId"] as string;

                if (!String.IsNullOrEmpty(model.UserPassword) && !String.IsNullOrEmpty(model.UserConfirmPassword))
                {

                    ApplicationDbContext applicationDbContext = new ApplicationDbContext();
                    applicationDbContext.UpdateUserInformation(model, newPassword);

                    //applicationDbContext.RetrieveAllUsers();

                    TempData["EmailUserLoggedIn"] = model.Email;
                    return RedirectToAction("Profile");
                    //return View(model);
                }
                else
                {
                    throw new NullReferenceException("One of the passwords or User ID is null");
                }
            }
            catch (Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View();
            }
        }

        [HttpGet]
        public IActionResult Logout()
        {
            TempData["EmailUserLoggedIn"] = null;

            return RedirectToAction("MainPage");
        }

        [HttpGet]
        public IActionResult Services(SignupViewModel model)
        {
            return View(model);
        }

        [HttpGet]
        public IActionResult Calendar()
        {
            return View();
            /*try
            {
                string email = string.Empty;

                if (TempData.ContainsKey("EmailUserLoggedIn") && TempData["EmailUserLoggedIn"] != null)
                {
                    email = TempData["EmailUserLoggedIn"].ToString();
                }
                else
                {
                    TempData["AlertMessageProfile"] = "User not logged in, cannot access Calendar page";
                }

                ApplicationDbContext applicationDb = new ApplicationDbContext();
                string id = applicationDb.GetUserIdByEmail(email);

                //string id = TempData["UserProfileID"] as string ?? Request.Query["id"];

                if (!String.IsNullOrEmpty(id))
                {

                    ApplicationDbContext applicationDbContext = new ApplicationDbContext();
                    SignupViewModel user = applicationDbContext.DisplayUserInformation(id);

                    TempData["UserProfileId"] = id;

                    return View(user);
                }
                else
                {
                    //return RedirectToAction("MainPage");
                    throw new NullReferenceException("Id for the user that wants profile changed is null");
                }
            }
            catch (Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View();
            }*/
        }

        /*[HttpPost]
        public IActionResult Calendar(SignupViewModel model)
        {
            try
            {
                ApplicationDbContext applicationDb = new ApplicationDbContext();
                string idStored = TempData["UserProfileId"].ToString();
                SignupViewModel modelTakenFromTemp = applicationDb.DisplayUserInformation(idStored);

                model.UserId = modelTakenFromTemp.UserId;
                model.FirstName = modelTakenFromTemp.FirstName;
                model.LastName = modelTakenFromTemp.LastName;
                model.Email = modelTakenFromTemp.Email;
                model.UserPassword = modelTakenFromTemp.UserPassword;
                model.UserConfirmPassword = modelTakenFromTemp.UserConfirmPassword;

                TempData["EmailUserLoggedIn"] = model.Email;
                return View();
            }
            catch (Exception ex)
            {
                Debug.Print($"Exception: {ex}");
                return View();
            }
        }*/

        [HttpGet]
        public IActionResult Map(SignupViewModel model)
        {
            return View(model);
        }
    }
}