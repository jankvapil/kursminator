using CourseApi.Data;
using CourseApi.Models;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace api.GraphQL.Places
{
    [ExtendObjectType(name: "Mutation")]
    public class PlaceMutations
    {
        [UseDbContext(typeof(AppDbContext))]
        public async Task<Place> AddPlaceAsync([ScopedService] AppDbContext context, AddPlaceInput input)
        {
            var place = new Place
            {
                Virutal = input.Virtual,
                Name = input.Name,
                Url = input.Url,
                Address = input.Address,
                City = input.City
            };

            await context.Places.AddAsync(place);
            await context.SaveChangesAsync();

            return place;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<Place> UpdatePlaceAsync([ScopedService] AppDbContext context, int id, UpdatePlaceInput input)
        {
            if (id != input.Id)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.BadRequest);

            var placeExists = context.Places.Any(c => c.Id == id);
            if (!placeExists)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            var placeUpdated = new Place
            {
                Id = input.Id,
                Virutal = input.Virtual,
                Name = input.Name,
                Url = input.Url,
                Address = input.Address,
                City = input.City
            };

            context.Places.Update(placeUpdated);
            await context.SaveChangesAsync();

            return placeUpdated;
        }

        [UseDbContext(typeof(AppDbContext))]
        public async Task<int> DeletePlaceAsync([ScopedService] AppDbContext context, int id)
        {
            var place = await context.Places.FindAsync(id);

            if (place is null)
                throw new HttpRequestException(string.Empty, null, HttpStatusCode.NotFound);

            context.Places.Remove(place);
            await context.SaveChangesAsync();

            return place.Id;
        }
    }
}
