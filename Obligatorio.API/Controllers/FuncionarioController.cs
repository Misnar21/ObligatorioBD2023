using Microsoft.AspNetCore.Mvc;

namespace Obligatorio.API.Controllers;

[ApiController]
[Route("[controller]")]
public class FuncionarioController : ControllerBase
{
    public FuncionarioController(){}

    [HttpGet("[[GetAllFuncionario]]")]
    public IEnumerable<Funcionario> GetAll()
    {
        throw new NotImplementedException();
    }
}
