using Microsoft.AspNetCore.Mvc;

namespace Obligatorio.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CarneSaludController : ControllerBase
{
    public CarneSaludController(){}

    [HttpGet("[[GetAllCarne]]")]
    public IEnumerable<CarneSalud> GetAll()
    {
        throw new NotImplementedException();
    }
}
