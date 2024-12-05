using AutoMapper;
using CarRentalAPI.Data;
using CarRentalAPI.DTOs;
using CarRentalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CarsController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // GET: api/Cars
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarDTO>>> GetCars()
    {
        var cars = await _context.Cars.ToListAsync();
        var carDTOs = _mapper.Map<IEnumerable<CarDTO>>(cars);
        return Ok(carDTOs);
    }

    // GET: api/Cars/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CarDTO>> GetCar(int id)
    {
        // Fetch the car by ID
        var car = await _context.Cars.FirstOrDefaultAsync(c => c.Id == id);

        // Return 404 if not found
        if (car == null)
        {
            return NotFound();
        }

        // Map to DTO and return 200 OK
        var carDTO = _mapper.Map<CarDTO>(car);
        return Ok(carDTO);
    }


    // POST: api/Cars
    [HttpPost]
    public async Task<ActionResult<CarDTO>> AddCar(CarDTO carDTO)
    {
        var car = _mapper.Map<Car>(carDTO);
        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        var createdCarDTO = _mapper.Map<CarDTO>(car);
        return CreatedAtAction(nameof(GetCars), new { id = car.Id }, createdCarDTO);
    }

    // PUT: api/Cars/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCar(int id, CarDTO carDTO)
    {
        if (id != carDTO.Id)
        {
            return BadRequest("Car ID mismatch.");
        }

        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound("Car not found.");
        }

        _mapper.Map(carDTO, car);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Cars.Any(c => c.Id == id))
            {
                return NotFound("Car not found during update.");
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Cars/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound("Car not found.");
        }

        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
