using Microsoft.Maui.Devices.Sensors;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using System.Reflection.PortableExecutable;
using System.Text;

namespace web_project
{
    public class ApplicationDbContext
    {
        public List<SignupViewModel> users = new List<SignupViewModel>();

        public void OnGet()
        {
            try
            {
                String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();

                String tableData = "SELECT * FROM accounts";
                SqlCommand command = new SqlCommand(tableData, connection);
                SqlDataReader reader = command.ExecuteReader();
                while(reader.Read())
                {
                    SignupViewModel user = new SignupViewModel();
                    user.UserId = reader.GetInt32(0);
                    user.FirstName = reader.GetString(1);
                    user.LastName = reader.GetString(2);
                    user.Email = reader.GetString(3);
                    user.UserPassword = reader.GetString(4);
                    user.UserConfirmPassword = reader.GetString(5);

                    users.Add(user);
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        private byte[] ConvertStringToByteArray(string str)
        {
            if(string.IsNullOrEmpty(str))
                throw new NullReferenceException($"Argument {str} cannot pe null");

            return Encoding.UTF8.GetBytes(str);
        }

        public void AddUser(SignupViewModel model)
        {
            try
            {
                String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();

                String userData = "(" + model.FirstName + "," + model.LastName + "," + model.Email + "," + model.UserPassword + ","
                    + model.UserConfirmPassword + ")";

                String sqlQuery = "INSERT INTO accounts (firstname, lastname, email, userPassword, userConfirmPassword) VALUES " +
                    "(@firstname,@lastname,@email,@userPassword,@userConfirmPassword)";

                SqlCommand command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@firstname", model.FirstName);
                command.Parameters.AddWithValue("@lastname", model.LastName);
                command.Parameters.AddWithValue("@email", model.Email);
                command.Parameters.AddWithValue("@userPassword", ConvertStringToByteArray(model.UserPassword));
                command.Parameters.AddWithValue("@userConfirmPassword", ConvertStringToByteArray(model.UserConfirmPassword));

                command.ExecuteNonQuery();
            }
            catch(SqlException ex)
            {
                throw ex;
            }

        }

        public SignupViewModel DisplayUserInformation(string id)
        {
            String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            String sqlQuery = "SELECT * FROM accounts WHERE id=@id";

            SqlCommand command = new SqlCommand(sqlQuery, connection);
            command.Parameters.AddWithValue("@id", id);

            SignupViewModel user = new SignupViewModel();
            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                user.UserId = reader.GetInt32(0);
                user.FirstName = reader.GetString(1);
                user.LastName = reader.GetString(2);
                user.Email = reader.GetString(3);

                byte[] confirmPasswordBytes = (byte[])reader[4];
                user.UserPassword = Encoding.UTF8.GetString(confirmPasswordBytes);

                confirmPasswordBytes = (byte[])reader[5];
                user.UserConfirmPassword = Encoding.UTF8.GetString(confirmPasswordBytes);


            }

            return user;
        }

        public void UpdateUserInformation(SignupViewModel model,string newPassword)
        {
            String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            String sqlQuery = "UPDATE accounts " +
                "SET userPassword=@userPassword, userConfirmPassword=@userConfirmPassword " +
                "WHERE email=@email";

            SqlCommand command = new SqlCommand(sqlQuery, connection);
            command.Parameters.AddWithValue("@email", model.Email);
            command.Parameters.AddWithValue("@userPassword", ConvertStringToByteArray(newPassword));
            command.Parameters.AddWithValue("@userConfirmPassword", ConvertStringToByteArray(newPassword));

            command.ExecuteNonQuery();
        }

        public bool CheckIfUserExists(string email,string password)
        {
            String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            String sqlQuery = "SELECT COUNT(*) FROM accounts WHERE email=@email AND userPassword=@userPassword";

            SqlCommand command = new SqlCommand(sqlQuery, connection);
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@userPassword", ConvertStringToByteArray(password));
            int count = (int)command.ExecuteScalar();

            return count > 0;
        }

        public string GetUserIdByEmail(string email)
        {
            String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            String sqlQuery = "SELECT * FROM accounts WHERE email=@email";

            SqlCommand command = new SqlCommand(sqlQuery, connection);
            command.Parameters.AddWithValue("@email", email);

            int idOfTheLoggedInUser = 0;
            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                idOfTheLoggedInUser = reader.GetInt32(0);
            }

            return idOfTheLoggedInUser.ToString();
        }

        /*public void RetrieveAllUsers()
        {
            String connectionString = "Data Source=.\\sqlexpress;Initial Catalog=accounts;Integrated Security=True";

            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();

            String tableData = "SELECT * FROM accounts";
            SqlCommand command = new SqlCommand(tableData, connection);
            SqlDataReader reader = command.ExecuteReader();
            List<SignupViewModel> allUsersList = new List<SignupViewModel>();

            while (reader.Read())
            {
                SignupViewModel user = new SignupViewModel();
                user.UserId = reader.GetInt32(0);
                user.FirstName = reader.GetString(1);
                user.LastName = reader.GetString(2);
                user.Email = reader.GetString(3);
                user.UserPassword = reader.GetString(4);
                user.UserConfirmPassword = reader.GetString(5);

                allUsersList.Add(user);
            }

            foreach(SignupViewModel user in allUsersList )
            {
                user.PrintMethod();
            }
        }*/
    }
}
