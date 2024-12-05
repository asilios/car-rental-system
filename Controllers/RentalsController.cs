using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRentalAPI.Data;
using CarRentalAPI.Models;
using CarRentalAPI.DTOs;  // Assuming the DTOs are in this namespace

namespace CarRentalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public RentalsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Rentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentalDTO>>> GetRentals()
        {
            // Fetch the rentals from the database
            var rentals = await _context.Rentals.Include(r => r.Car).ToListAsync();

            // Map the rentals to RentalDTOs
            var rentalDTOs = _mapper.Map<IEnumerable<RentalDTO>>(rentals);

            return Ok(rentalDTOs);
        }

        // GET: api/Rentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentalDTO>> GetRental(int id)
        {
            var rental = await _context.Rentals.Include(r => r.Car).FirstOrDefaultAsync(r => r.Id == id);
            if (rental == null)
            {
                return NotFound();
            }
            var rentalDTO = _mapper.Map<RentalDTO>(rental);
            return Ok(rentalDTO);
        }

        // POST: api/Rentals
        [HttpPost]
        public async Task<ActionResult<RentalDTO>> PostRental(RentalDTO rentalDTO)
        {
            var car = await _context.Cars.FindAsync(rentalDTO.CarId);
            if (car == null)
            {
                return NotFound("Car not found");
            }
            var rental = _mapper.Map<Rental>(rentalDTO);
            rental.Car = car;
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();
            var createdRentalDTO = _mapper.Map<RentalDTO>(rental);
            return CreatedAtAction(nameof(GetRental), new { id = rental.Id }, createdRentalDTO);
        }


        // PUT: api/Rentals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRental(int id, RentalDTO rentalDTO)
        {
            if (id != rentalDTO.Id)
            {
                return BadRequest();
            }
            var rental = _mapper.Map<Rental>(rentalDTO);
            _context.Entry(rental).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Rentals.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE: api/Rentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }
            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
