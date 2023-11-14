using Microsoft.AspNetCore.Mvc;

namespace Obligatorio.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AgendaController : ControllerBase
{
    public AgendaController(){}

    [HttpGet("[[GetAllAgenda]]")]
    public IEnumerable<Agenda> GetAll()
    {
        throw new NotImplementedException();
    }
}
