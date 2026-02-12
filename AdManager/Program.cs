using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using AdManager.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
      options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
      options.JsonSerializerOptions.WriteIndented = true;
    });

// Configure DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Enable CORS for Angular frontend
builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular", policy =>
      policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
  );
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "AdManager API", Version = "v1" });
});

var app = builder.Build();

// Use middleware
app.UseCors("AllowAngular");

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AdManager API v1"));
}

app.UseAuthorization();
app.MapControllers();

app.Run();



//using Microsoft.EntityFrameworkCore;
//using Microsoft.OpenApi.Models;
//using AdManager.Data;
//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();

//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
//);

//builder.Services.AddCors(options =>
//{
//  options.AddPolicy("AllowAngular", policy =>
//  {
//    policy.WithOrigins("http://localhost:4200")
//          .AllowAnyHeader()
//          .AllowAnyMethod();
//  });
//});

//builder.Services.AddControllers()
//    .AddJsonOptions(options =>
//    {
//      options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
//      options.JsonSerializerOptions.WriteIndented = true;
//    });


//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(c =>
//{
//  c.SwaggerDoc("v1", new OpenApiInfo
//  {
//    Title = "AdManager API",
//    Version = "v1"
//  });
//});

//var app = builder.Build();

//// Enable CORS
//app.UseCors("AllowAngular");

//// Enable Swagger in Development
//if (app.Environment.IsDevelopment())
//{
//  app.UseSwagger();
//  app.UseSwaggerUI(c =>
//  {
//    c.SwaggerEndpoint("/swagger/v1/swagger.json", "AdManager API v1");
//    // Optional: serve Swagger UI at root: c.RoutePrefix = string.Empty;
//  });
//}

//app.UseAuthorization();
//app.MapControllers();

//app.Run();
