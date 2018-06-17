using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
//using System.Net.Http;
using RestSharp;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyAngularApp.Controllers
{
    [Route("api/[controller]")]
    public class ServiceProxyController : Controller
    {
        private IConfiguration _configuration;

        public ServiceProxyController(IConfiguration configuration) {
            _configuration = configuration;
        }

        [HttpGet]
        [HttpPost]
        [Route("[action]")]
        public IActionResult Get([FromQuery]string resource, [FromQuery]string method)
        {
            RestClient client = new RestClient(_configuration["ConsumeServiceConfig:ServiceUrl"]);
            RestRequest req = new RestRequest(resource);
            req.Method = GetRequestMethod(method);

            if (req.Method == Method.POST)
            {
                //Stream stream = Request.ReadFormAsync().Result //Request.Content.ReadAsStreamAsync().Result;
                if (Request.Body.CanSeek)
                {
                    Request.Body.Position = 0;
                }
                StreamReader rdr = new StreamReader(Request.Body);
                string content = rdr.ReadToEnd();
                rdr.Close();
                rdr.Dispose();
                //stream.Close();
                //stream.Dispose();
                req.AddParameter("application/json", content, ParameterType.RequestBody);
            }
            else if (req.Method == Method.GET)
            {
                var qry = Request.Query;
                foreach (var item in qry)
                {
                    if (item.Key.ToLower() != "resource" && item.Key.ToLower() != "method")
                    {
                        req.AddQueryParameter(item.Key, item.Value);
                    }
                }
            }
            req.Timeout = 24 * 60 * 60 * 1000;
            RestResponse resp = (RestResponse)(client.Execute(req));

            ContentResult response = new ContentResult { Content = resp.Content, ContentType = resp.ContentType, StatusCode = (int)resp.StatusCode };
            //if (resp.StatusCode == 0)
            //{
            //    response.StatusCode = System.Net.HttpStatusCode.NotFound;
            //    response.ReasonPhrase = "Not Found";
            //    return response;
            //}

            //response.StatusCode = resp.StatusCode;
            //response.ReasonPhrase = resp.StatusDescription;
            //if (resp.RawBytes != null)
            //{
            //    response.Content = new StreamContent(new MemoryStream(resp.RawBytes));
            //}
            //else
            //{
            //    response.Content = new StreamContent(new MemoryStream(System.Text.Encoding.UTF8.GetBytes("")));
            //}
            //if (resp.ContentType != null)
            //{
            //    if (resp.ContentType.ToLower().Contains(";"))
            //    {
            //        string[] arrContentTypeSplit = resp.ContentType.Split(';');
            //        response.Content.Headers.ContentType = new MediaTypeHeaderValue(arrContentTypeSplit[0]);
            //    }
            //    else
            //    {
            //        response.Content.Headers.ContentType = new MediaTypeHeaderValue(resp.ContentType);
            //    }
            //}

            //response.Headers.ContentType = "";
            //if (resource.ToLower().Contains("heatmap"))
            //{
            //    response.Headers.CacheControl = CacheControlHeaderValue.Parse("max-age=7200,public");
            //    response.Headers.Add("pragma", "public");
            //}



            return response;
        }

        private Method GetRequestMethod(string method)
        {
            switch (method.ToUpper())
            {
                case "GET":
                    return Method.GET;

                case "POST":
                    return Method.POST;

                case "PUT":
                    return Method.PUT;

                case "HEAD":
                    return Method.HEAD;

                case "OPTIONS":
                    return Method.OPTIONS;

                case "DELETE":
                    return Method.DELETE;

                case "MERGE":
                    return Method.MERGE;

                case "PATCH":
                    return Method.PATCH;

                default:
                    return Method.GET;

            }
        }

        //// GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
