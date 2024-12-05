using AutoMapper;
using CarRentalAPI.Models;
using CarRentalAPI.DTOs;

public class RentalMappingProfile : Profile
{
    public RentalMappingProfile()
    {

        CreateMap<Rental, RentalDTO>()
            .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.Car.Id));


        CreateMap<RentalDTO, Rental>()
            .ForMember(dest => dest.Car, opt => opt.MapFrom(src => new Car { Id = src.CarId }));
    }
}
