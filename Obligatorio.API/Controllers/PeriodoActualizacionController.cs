using Microsoft.AspNetCore.Mvc;

namespace Obligatorio.API.Controllers;

[ApiController]
[Route("[controller]")]
public class PeriodoActualizacionController : ControllerBase
{
    public PeriodoActualizacionController(){}

    [HttpGet("[[GetAllPeriodo]]")]
    public IEnumerable<PeriodoActualizacion> GetAll()
    {
        throw new NotImplementedException();
    }
}
