namespace SportsWorldAPI.Interfaces;

interface IAthlete
{
    int Id { get; set; }
    string Name { get; set; }
    string Gender { get; set;}
    double Price { get; set; }
    string Image { get; set; }
    bool PurchaseStatus { get; set; }
} 

