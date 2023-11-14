using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Obligatorio.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        public UsuarioController() { }

        [HttpGet("[[GetAllUsuario]]")]
        public IEnumerable<Usuario> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
