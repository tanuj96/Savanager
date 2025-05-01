using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Savanager.Api.Services;
using Savanager.Api.Models;
using Savanager.Api.Data;
using Microsoft.AspNetCore.Identity;

namespace Savanager.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SavanagerDbContext _context;
        private readonly JwtTokenService _jwtService;
        private readonly PasswordHasher _passwordHasher;

        public AuthController(SavanagerDbContext context, JwtTokenService jwtService, PasswordHasher passwordHasher)
        {
            _context = context;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // Compare hashed passwords
            if (!_passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid username or password");
            }

            var token = _jwtService.GenerateToken(user.Username);
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return BadRequest("Username already exists.");
            }

            var passwordHash = _passwordHasher.HashPassword(request.Password);

            var newUser = new User
            {
                Username = request.Username,
                PasswordHash = passwordHash,
                UserType = request.UserType
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }
    }
}
