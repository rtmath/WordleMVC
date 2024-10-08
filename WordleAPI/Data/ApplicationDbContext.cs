﻿using Microsoft.EntityFrameworkCore;

using WordleAPI.Models;

namespace WordleAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<WordModel> Words { get; set; }
    }
}
