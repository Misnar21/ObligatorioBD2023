using Microsoft.AspNetCore.Mvc;

namespace Obligatorio.API.Controllers;

[ApiController]
[Route("[funcionario]")]
public class FuncionarioController : ControllerBase
{
    public FuncionarioController(){}

    [HttpGet(Name = "GetAll")]
    public IEnumerable<Funcionario> GetAll()
    {
        throw new NotImplementedException();
    }
}
