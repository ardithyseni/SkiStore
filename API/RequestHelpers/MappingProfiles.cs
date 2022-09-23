using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{   
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>(); // from what to what
            CreateMap<UpdateProductDto, Product>(); // from what to what
        }
    }
}