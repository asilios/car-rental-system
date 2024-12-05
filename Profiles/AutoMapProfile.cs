using AutoMapper;
using CarRentalAPI.Models;
using CarRentalAPI.DTOs;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Car, CarDTO>();

        CreateMap<CarDTO, Car>();
    }
}
