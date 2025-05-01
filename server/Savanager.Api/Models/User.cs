namespace Savanager.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string UserType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}