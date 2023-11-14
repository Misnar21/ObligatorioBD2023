namespace Obligatorio.API;

public class Agenda
{
    public int id { get; set; }
    public string ci { get; set; }
    public DateOnly fechaAgenda { get; set; }

    public Agenda(int _id,
                  string _ci, 
                  DateOnly _fechaAgenda) 
    {
        this.id = _id;
        this.ci = _ci;
        this.fechaAgenda = _fechaAgenda;
    }
}
