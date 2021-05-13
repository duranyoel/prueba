using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WheatherController : ControllerBase
    {
        // GET: api/<WheatherController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            string url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=2b4400b1f69af9df341160d7be8fcff8";
            var json = new WebClient().DownloadString(url);
            yield return json.ToString();
        }

        // GET api/<WheatherController>/5
        [HttpGet("{ciudad}")]
        public string Get(string ciudad)
        {
            string url = "";
            string url1 = "";
            var json = "";
            var json1 = "";
            if (ciudad.ToString() ==null)
            {
                url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=2b4400b1f69af9df341160d7be8fcff8";
                url1 = "https://newsapi.org/v2/everything?q=london&apiKey=27c9d9bb462c4ce2a2550ce4dc91760c";
            }
            else
            {
                url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=2b4400b1f69af9df341160d7be8fcff8";
                url1 = "https://newsapi.org/v2/everything?q="+ciudad+"&apiKey=27c9d9bb462c4ce2a2550ce4dc91760c";
            }

            try
            {
                json = new WebClient().DownloadString(url);
                json1 = new WebClient().DownloadString(url1);
            }
            catch (WebException e)
            {

                if (((HttpWebResponse)e.Response).StatusCode == HttpStatusCode.NotFound)
                {
                    
                }
                
            }
            var final ="["+json+","+ json1+"]";
            return final.ToString();
        }

        // POST api/<WheatherController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<WheatherController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WheatherController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
