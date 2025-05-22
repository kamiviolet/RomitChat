using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Security.Principal;
using System.Security.AccessControl;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Windows.Forms;
using System.Security.Cryptography;
using System.Data.OleDb;
using System.Runtime.Remoting;
using System.Reflection;
using System.Security.Claims;

using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using System.Runtime.ConstrainedExecution;
using Newtonsoft.Json.Converters;
using System.ComponentModel;
using System.Deployment.Application;
using System.Runtime.InteropServices.ComTypes;
using WebSocketSharp.Server;
using System.Runtime.Remoting.Contexts;


namespace httpFormSSLsrvv
{

    public partial class Form1 : Form
    {
        public delegate void TALK(string msg, params object[] data);
        public static TALK gWPA = null;

        public static Form1 meForm1 = null;

        public string saveFile = Directory.GetCurrentDirectory() + "\\configSaved.json";
        public Random kondom = new Random();

        /// <summary>
        /// https server listen params
        /// </summary>
        public string custIPlistAdres = "0.0.0.0";
        public int cuustPortLisen = 9999;
        public bool SecureUse = false;
        public bool AllowDirBrowse = true;

        /// <summary>
        /// TCP to ssl bridge params
        /// </summary>
        public int tcpBridgePortListen = 41794;
        public string tcpBridgeListenAdres = "0.0.0.0";
        public string tcpBridgeConnectAdres = "192.168.166.54";
        public int tcpBridgeConnectPort = 41796;
        public int brdgBufSize = 2048;
        

        private static String rootPathUrl = "/SSL_Server"; // Directory.GetCurrentDirectory() + "\\SSL_Server";  //"D:/SSL_Server";
        private static String certPath = "";
        private static String wwwPath = "";
        public string wwwDefaultIndexFile = "index.html";
        //  alteernativee for testing consider D:\WLOZ\HmltJQlz\gogleWEbdezideer\farking\meleme.htmls
        private static X509Certificate2 sslCertificate = null;
        public static X509Certificate sslClientCertifikat = null;

        /// <summary>
        /// https server listening thread
        /// </summary>
        private Thread thread = null;

        /// <summary>
        /// TCP NONssl to ssl bridge listening thread...
        /// </summary>
        private Thread bridgeListThread = null;

        //             {".ico", "application/octet-stream"},
        private IDictionary<String, String> fileTypes = new Dictionary<String, String>() {

            {".txt", "text/plain; charset=utf-8"},
            {".png", "image/png"},
            {".jpeg", "image/jpeg"},
            {".jpg", "image/jpeg"},
            {".gif", "image/gif"},
            {".bmp", "image/bmp"},
            {".svg", "image/svg+xml"},
            {".ico", "image/x-icon"},
            {".html", "text/html; charset=utf-8"},
            {".htm", "text/html; charset=utf-8"},
            {".css", "text/css"},
            {".js", "text/javascript; charset=utf-8"},
            {".json", "application/json; charset=utf-8"},
            {".xml", "application/xml; charset=utf-8"},
            {".woff", "application/x-font-woff"},
            {".woff2", "application/x-font-woff2"},
            {".ttf", "application/x-font-ttf"},
            {".oet", "application/x-msdownload"},
            {".sgd", "application/x-msdownload"},
            {".dll", "application/x-msdownload"},
            {".exe", "application/x-msdownload"},
            {".cpz", "application/x-zip-compressed"},
            {".lpz", "application/x-zip-compressed"},
            {".7z", "application/x-zip-compressed"},
            {".zip", "application/x-zip-compressed"},
            {".bin", "application/octet-stream"},
            {".pdf", "application/pdf"}
        };
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
        //  {".woff", "application/font-woff"},
        // maybe use  >>> System.Web.MimeMapping.GetMimeMapping
        // ...but we just extracted the dictionary from there >>
        public IDictionary<String, String> FileTypesEX = null;


        public Form1()
        {
            meForm1 = this;
            gWPA = this.WPA;
            InitializeComponent();
        }

     //   public List<object> refledshits = new List<object>();

        private void DisplayLogs(TcpClient client, SasyMax stream)
        {
            if (client == null || stream == null || stream.isDiposed) { return; }
            try
            {
                if (Form1.vrbosePrint)
                {
                    textBox1.Text += "clientConnected:" + client.Connected.ToString() + "\r\n";
                    textBox1.Text += "\r\n";
                    textBox1.Text += "\r\n isDisposed:" + stream.isDiposed.ToString();
                    textBox1.Text += "\r\n" + "Is mutually authenticated: " + stream.IsMutuallyAuthenticated.ToString();
                    textBox1.Text += "\r\n" + "Can read: " + stream.CanRead + " write: " + stream.CanWrite.ToString();
                    textBox1.Text += "\r\n" + "Protocol: " + stream.SslProtocol.ToString();
                }

                var innerbuzner = stream._spslState;
                if (innerbuzner != null)
                {
                    if (Form1.vrbosePrint)
                        textBox1.Text += "\r\n inner _SSlstate: " + innerbuzner.ToString();
                    /*
                    // (System.Net.Security.SslState)innerbuzner)
                    var sweeptype = innerbuzner.GetType();
                    var allzmetci = sweeptype.GetMembers((System.Reflection.BindingFlags)7741);
                    var cunda = 0;
                    refledshits.Clear();
                    foreach (var zmetek in allzmetci)
                    {
                        object extrabuk = null;
                        if (zmetek is FieldInfo)
                        {
                            extrabuk = ((FieldInfo)zmetek).GetValue(innerbuzner);
                        }
                        else if (zmetek is PropertyInfo)
                        {
                            extrabuk = ((PropertyInfo)zmetek).GetValue(innerbuzner);
                        }
                        if (extrabuk != null)
                            refledshits.Add(extrabuk);

                        textBox1.Text += string.Format("x:{0}  nam:{1}, mt:{2}, o:{3} \r\n",
                            cunda,
                            zmetek.Name,
                            zmetek.MemberType,
                            extrabuk != null ? extrabuk.ToString() : ""
                            );
                        
                        cunda++;
                    }
                    */
                }


            }
            catch (Exception ex)
            {
                //  MessageBox.Show("err: {0}", ex.Message);
                WPA(" in DisplayLogsrrr: {0}", ex.Message);
            }
        }

        private void prepareHttpSecureResponse(String resourceUrl, SasyMax sslStream)
        {
            // https://localhost.com/some_page.html ---> /some_page.html
            // https://localhost.com/some/ ---> /some/index.html ---> /www/some/index.html
            String actualPath = wwwPath;
            actualPath = actualPath.TrimEnd('/', '\\');
            int responseCode = 200;
            byte[] outputPayload;
            String fileType = null;

            if (vrbosePrint)
                WPA("....incoming URL path: {0} ...", resourceUrl);

            if (string.IsNullOrEmpty(wwwDefaultIndexFile))
                wwwDefaultIndexFile = "index.html";

            if (resourceUrl.Contains("%"))
            {
                //https://127.0.0.1:9999/icons/Speaker%202.svg
              
                resourceUrl = Uri.UnescapeDataString(resourceUrl);
            }

            if (AllowDirBrowse)
            {
                if (resourceUrl == null || !resourceUrl.Contains("."))
                {
                    var combodirbrowshtml = prepDirBrows(actualPath, resourceUrl);
                    //   WPA("chave combo:{0}", combodirbrowshtml);

                    outputPayload = Encoding.ASCII.GetBytes(combodirbrowshtml);
                    responseCode = 200;
                    fileType = "text/html; charset=utf-8";
                    byte[] hderBytes = Encoding.ASCII.GetBytes(httpHeader(responseCode, fileType, combodirbrowshtml.Length + 1));
                    byte[] endCon = Encoding.ASCII.GetBytes("\n");
                    if (sslStream != null)
                    {
                        sslStream.Write(hderBytes, 0, hderBytes.Length);
                        sslStream.Write(outputPayload, 0, outputPayload.Length);
                        sslStream.Write(endCon, 0, endCon.Length);
                        sslStream.Flush();
                    }

                    return;
                }
            }

            if (resourceUrl == null || resourceUrl.Trim().Equals("") || resourceUrl.Trim().Equals("/"))
            {
                actualPath += "\\" + wwwDefaultIndexFile; // "\\index.html";
            }
            else if (resourceUrl.Trim().EndsWith("/"))
            {
                actualPath += "\\" + resourceUrl.Trim() + "\\" + wwwDefaultIndexFile;   // "\\index.html";
            }
            else
            {
                actualPath += "\\" + resourceUrl.Trim();
            }

            if (!actualPath.Contains("."))
            {
                // no sign of diile ..probably just dir..
                actualPath = actualPath.TrimEnd('/', '\\');
                actualPath += "\\" + wwwDefaultIndexFile; // "\\index.html";
            }

            actualPath = actualPath.Replace('/', '\\');
            actualPath = actualPath.Replace("\\\\", "\\");       // 2 za jednu
            if (actualPath.Contains("\\\\"))     // if still ??
                actualPath = actualPath.Replace("\\\\", "\\");

            if (!File.Exists(actualPath))
            {
                var jeendira = "/";
                FileInfo mofo = new FileInfo(actualPath);
                if (mofo.Attributes.HasFlag(FileAttributes.Directory) && Directory.Exists(mofo.FullName))
                {
                    WPA("...one je to vlastne diiira :{0}, kera pica dala tecku do nazvu slozky !!!", mofo.FullName);
                    jeendira = mofo.FullName;
                }
                else
                {
                    jeendira = Path.GetDirectoryName(actualPath);
                }

                if (!Directory.Exists(jeendira))
                {
                    var lookupparent = Directory.GetParent(jeendira);
                    if (!Directory.Exists(lookupparent.FullName))
                    {
                        lookupparent = lookupparent.Parent;
                        if (!Directory.Exists(lookupparent.FullName))
                        {
                            lookupparent = lookupparent.Parent;
                            if (!Directory.Exists(lookupparent.FullName))
                            {
                                lookupparent = lookupparent.Parent;
                                if (!Directory.Exists(lookupparent.FullName))
                                {
                                    lookupparent = lookupparent.Parent;
                                    if (!Directory.Exists(lookupparent.FullName))
                                    {
                                        WPA("even very up parend folder failing !!!, {0}", lookupparent.FullName);
                                        jeendira = Directory.GetDirectoryRoot(lookupparent.FullName);
                                        lookupparent = new DirectoryInfo(jeendira);
                                    }
                                }
                            }
                        }
                    }

                    jeendira = lookupparent.FullName;

                }

                var somefily = Directory.GetFileSystemEntries(jeendira);
                if (somefily != null && somefily.Length > 0)
                {
                    var podobyIndexu = somefily.FirstOrDefault(idealne => idealne.IndexOf("index", StringComparison.CurrentCultureIgnoreCase) > -1);
                    if (podobyIndexu != null)
                    {
                        actualPath = podobyIndexu;
                    }
                    else
                    {
                        podobyIndexu = somefily.FirstOrDefault(takaspon => takaspon.EndsWith("html", StringComparison.CurrentCultureIgnoreCase) || takaspon.EndsWith("htm", StringComparison.CurrentCultureIgnoreCase));
                    }
                    // if after that still none..then just pass first aviable file...
                    if (podobyIndexu == null)
                    {

                        var combodirbrowshtml = prepDirBrows(System.IO.Path.GetDirectoryName(jeendira), resourceUrl);
                        //   WPA("chave combo:{0}", combodirbrowshtml);

                        outputPayload = Encoding.ASCII.GetBytes(combodirbrowshtml);
                        responseCode = 200;
                        fileType = "text/html; charset=utf-8";
                        byte[] hderBytes = Encoding.ASCII.GetBytes(httpHeader(responseCode, fileType, combodirbrowshtml.Length + 1));
                        byte[] endCon = Encoding.ASCII.GetBytes("\n");
                        if (sslStream != null)
                        {
                            sslStream.Write(hderBytes, 0, hderBytes.Length);
                            sslStream.Write(outputPayload, 0, outputPayload.Length);
                            sslStream.Write(endCon, 0, endCon.Length);
                            sslStream.Flush();
                        }

                        return;

                        // pretend its ok >>
                     //   podobyIndexu = somefily[0];
                    }

                    if (podobyIndexu != null)
                        actualPath = podobyIndexu;
                }
            }


            if (File.Exists(actualPath))
            {
                var indexOfDot = actualPath.LastIndexOf('.');
                if (indexOfDot > 0)
                {
                    var fileextenze = actualPath.Substring(indexOfDot);
                    if (fileTypes.ContainsKey(fileextenze))
                        fileType = fileTypes[fileextenze];
                    else if (FileTypesEX.ContainsKey(fileextenze))
                        fileType = FileTypesEX[fileextenze];
                    else
                        fileType = "text/plain; charset=utf-8";
                }

                outputPayload = fetchFileContent(actualPath);
            }
            else
            {
                responseCode = 404;
                //fileType ??= "text/html; charset=utf-8";
                fileType = "text/html; charset=utf-8";
                outputPayload = Encoding.ASCII.GetBytes("" +
                    "<html> <head> <title> 404 </title> </head>" +
                    "<body style=\"text-align:center;\" > <h2> Oops ! Page Not Found </h2> </body> ");
            }
            if (fileType == null)
                fileType = "text/plain; charset=utf-8";

            byte[] headerBytes = Encoding.ASCII.GetBytes(
                    httpHeader(responseCode, fileType, outputPayload.Length + 1));

            byte[] endConnect = Encoding.ASCII.GetBytes("\n");

            // Write the entire HTTP response to the stream;
            if (sslStream != null)
            {
                sslStream.Write(headerBytes, 0, headerBytes.Length);
                sslStream.Write(outputPayload, 0, outputPayload.Length);
                sslStream.Write(endConnect, 0, endConnect.Length);
                sslStream.Flush();
            }

            return;

        }

        private void prepareHttpSimpleResponse(String resourceUrl, NetworkStream nStream)
        {
            // https://localhost.com/some_page.html ---> /some_page.html
            // https://localhost.com/some/ ---> /some/index.html ---> /www/some/index.html
            String actualPath = wwwPath;
            actualPath = actualPath.TrimEnd('/', '\\');
            int responseCode = 200;
            byte[] outputPayload;
            String fileType = null;

            if (vrbosePrint)
                WPA("....incoming URL path: {0} ...", resourceUrl);
            if (string.IsNullOrEmpty(wwwDefaultIndexFile))
                wwwDefaultIndexFile = "index.html";

            if (AllowDirBrowse)
            {
                if (resourceUrl == null || !resourceUrl.Contains("."))
                {
                    var combodirbrowshtml = prepDirBrows(actualPath, resourceUrl);
                    //   WPA("chave combo:{0}", combodirbrowshtml);

                    outputPayload = Encoding.ASCII.GetBytes(combodirbrowshtml);
                    responseCode = 200;
                    fileType = "text/html; charset=utf-8";
                    byte[] hderBytes = Encoding.ASCII.GetBytes(httpHeader(responseCode, fileType, combodirbrowshtml.Length + 1));
                    byte[] endCon = Encoding.ASCII.GetBytes("\n");
                    if (nStream != null)
                    {
                        nStream.Write(hderBytes, 0, hderBytes.Length);
                        nStream.Write(outputPayload, 0, outputPayload.Length);
                        nStream.Write(endCon, 0, endCon.Length);
                        nStream.Flush();
                    }

                    return;
                }
            }

            if (resourceUrl == null || resourceUrl.Trim().Equals("") || resourceUrl.Trim().Equals("/"))
            {
                actualPath += "\\" + wwwDefaultIndexFile; // "\\index.html";
            }
            else if (resourceUrl.Trim().EndsWith("/"))
            {
                actualPath += "\\" + resourceUrl.Trim() + "\\" + wwwDefaultIndexFile;   // "\\index.html";
            }
            else
            {
                actualPath += "\\" + resourceUrl.Trim();
            }

            if (!actualPath.Contains("."))
            {
                // no sign of diile ..probably just dir..
                actualPath = actualPath.TrimEnd('/', '\\');
                actualPath += "\\" + wwwDefaultIndexFile; // "\\index.html";
            }

            actualPath = actualPath.Replace('/', '\\');
            actualPath = actualPath.Replace("\\\\", "\\");       // 2 za jednu
            if (actualPath.Contains("\\\\"))     // if still ??
                actualPath = actualPath.Replace("\\\\", "\\");

            if (!File.Exists(actualPath))
            {
                var jeendira = Path.GetDirectoryName(actualPath);
                if (!Directory.Exists(jeendira))
                {
                    var lookupparent = Directory.GetParent(jeendira);
                    if (!Directory.Exists(lookupparent.FullName))
                    {
                        lookupparent = lookupparent.Parent;
                        if (!Directory.Exists(lookupparent.FullName))
                        {
                            lookupparent = lookupparent.Parent;
                            if (!Directory.Exists(lookupparent.FullName))
                            {
                                lookupparent = lookupparent.Parent;
                                if (!Directory.Exists(lookupparent.FullName))
                                {
                                    lookupparent = lookupparent.Parent;
                                    if (!Directory.Exists(lookupparent.FullName))
                                    {
                                        WPA("even very up parend folder failing !!!, {0}", lookupparent.FullName);
                                        jeendira = Directory.GetDirectoryRoot(lookupparent.FullName);
                                        lookupparent = new DirectoryInfo(jeendira);
                                    }
                                }
                            }
                        }
                    }

                    jeendira = lookupparent.FullName;

                }

                var somefily = Directory.GetFileSystemEntries(jeendira);
                if (somefily != null && somefily.Length > 0)
                {
                    var podobyIndexu = somefily.FirstOrDefault(idealne => idealne.IndexOf("index", StringComparison.CurrentCultureIgnoreCase) > -1);
                    if (podobyIndexu != null)
                    {
                        actualPath = podobyIndexu;
                    }
                    else
                    {
                        podobyIndexu = somefily.FirstOrDefault(takaspon => takaspon.EndsWith("html", StringComparison.CurrentCultureIgnoreCase) || takaspon.EndsWith("htm", StringComparison.CurrentCultureIgnoreCase));
                    }
                    // if after that still none..then just pass first aviable file...
                    if (podobyIndexu == null)
                        podobyIndexu = somefily[0];

                    if (podobyIndexu != null)
                        actualPath = podobyIndexu;
                }
            }


            if (File.Exists(actualPath))
            {
                var indexOfDot = actualPath.LastIndexOf('.');
                if (indexOfDot > 0)
                {
                    var fileextenze = actualPath.Substring(indexOfDot);
                    if (fileTypes.ContainsKey(fileextenze))
                        fileType = fileTypes[fileextenze];
                    else if (FileTypesEX.ContainsKey(fileextenze))
                        fileType = FileTypesEX[fileextenze];
                    else
                        fileType = "text/plain; charset=utf-8";
                }

                outputPayload = fetchFileContent(actualPath);
            }
            else
            {
                responseCode = 404;
                //fileType ??= "text/html; charset=utf-8";
                fileType = "text/html; charset=utf-8";
                outputPayload = Encoding.ASCII.GetBytes("" +
                    "<html> <head> <title> 404 </title> </head>" +
                    "<body style=\"text-align:center;\" > <h2> Oops ! Page Not Found </h2> </body> ");
            }
            if (fileType == null)
                fileType = "text/plain; charset=utf-8";

            byte[] headerBytes = Encoding.ASCII.GetBytes(
                    httpHeader(responseCode, fileType, outputPayload.Length + 1));

            byte[] endConnect = Encoding.ASCII.GetBytes("\n");

            // Write the entire HTTP response to the stream;
            if (nStream != null)
            {
                nStream.Write(headerBytes, 0, headerBytes.Length);
                nStream.Write(outputPayload, 0, outputPayload.Length);
                nStream.Write(endConnect, 0, endConnect.Length);
                nStream.Flush();
            }

            return;

        }

        // atempt of dire browse ..
        // viz by templat D:\WLOZ\wo\ITS\Crestron SW\sharp\_exportCWS\Cawsar\CuwaV4\Libs\reCreateHTTPsrv\fileBrowseTemplatt\127.0.0.1 - _shitout_Cuwasar_.htm
        string prepDirBrows(string ofThatDir, string relativeDir)
        {
            //  fileType = "text/html; charset=utf-8";

            var outputPayload = "";
            if (string.IsNullOrEmpty(relativeDir))
                relativeDir = "/";

            var tarageetdir = ofThatDir + relativeDir.Replace("/", "\\");
            tarageetdir = tarageetdir.Replace("\\\\", "\\");
            //  WPA("\n\r generating dirastrucfor:{0}, relative:{1}, targetdir:{2}\n\n", ofThatDir, relativeDir, tarageetdir);
          //  WPA(" generatingfortargetdir:{0}\n\n", tarageetdir);

            if (Directory.Exists(tarageetdir))
            {
                DirectoryInfo rofo = new System.IO.DirectoryInfo(tarageetdir);
                var filkydiirky = rofo.GetFileSystemInfos();

                outputPayload = "" +
                    "<html> <head> <title> " + relativeDir + " </title> </head>" +
                    "<body style=\"background-color: #c7c7c7;\">";
                outputPayload += "<h1> - "+ relativeDir + "</h1>";
                outputPayload += "<hr>";
                outputPayload += "<pre>";

                // not usable...    var parentDiira = relativeDir.Trim() == "/" ? "/" : System.IO.Directory.GetParent(relativeDir).FullName;

                var parentDiira = "/";
                var lastLomex = relativeDir.LastIndexOf("/");
                if (lastLomex > 0)
                    parentDiira = relativeDir.Substring(0, lastLomex);

                outputPayload += "<a href=\""+ parentDiira + "\">[To Parent Directory]</a>";
                outputPayload += "<br><br>";

                foreach (var filar in filkydiirky)
                {
                    outputPayload += oneFileRowgen(filar, relativeDir);
                }

                outputPayload += "</pre>";
                outputPayload += "<hr>";
                outputPayload += "</body></html>";

            
            }

            return outputPayload;
        }
        string oneFileRowgen(FileSystemInfo oneFile, string relativeDir)
        {
            if (oneFile == null)
                return "";
            var combo = "";

            //  7/31/2022  8:11 AM        <dir> 
            combo += oneFile.LastWriteTime.ToString("dd/MM/yyyy  HH:mm");
            var paddedSizeInfo = "";
            if (oneFile is System.IO.DirectoryInfo)
            {
                var onedira = (System.IO.DirectoryInfo)oneFile;
               // combo += " [DIR] ";
                paddedSizeInfo = " [DIR] ";
            }
            else
            {
                System.IO.FileInfo ofo = (System.IO.FileInfo)oneFile;
              //  combo += " " + ofo.Length.ToString() + " ";
                paddedSizeInfo = " " + ofo.Length.ToString() + " ";
            }
            paddedSizeInfo = paddedSizeInfo.PadLeft(16);
            combo += paddedSizeInfo;

            var hypalink = relativeDir + "/" + oneFile.Name;
            hypalink = hypalink.Replace("//", "/");
            combo += "<a href=\"" + hypalink + "\">" + oneFile.Name + "</a>";

            combo += "<br>";
            return combo;
        }

        /// <summary>
        /// let say there is misguided fantasyto attachh some specific headrs to respons...
        /// </summary>
        public List<string> ExtraAditionalHeadrs = new List<string>();

        //Prepare HTTP Response Header
        private String httpHeader(int responseCode, String contentType, int contentLen)
        {
            String responseHeader = "HTTP/1.1 " + responseCode.ToString()
                + "\nServer: SimpleSSLServer"
                + "\nContent-Type: " + contentType
                + "\nContent-Length: " + contentLen.ToString()
                + "\nAccess-Control-Allow-Origin: *"
                + "\nAccess-Control-Allow-Methods: *";

            if (ExtraAditionalHeadrs.Count < 1)
            {
                responseHeader += "\n\n";        //.. final row to mark end of headrs
            }
            else
            {
                if (vrbosePrint)
                    WPB("..using Extra Aditional Headrs, count:{0}", ExtraAditionalHeadrs.Count);

                foreach (var custoHadr in ExtraAditionalHeadrs)
                {
                    if (custoHadr != null && custoHadr.Length > 0)
                    {
                        var trimed = custoHadr.Trim();
                        trimed = trimed.TrimEnd('\x0D', '\x0A');
                        trimed = trimed.TrimStart('\x0D', '\x0A');

                     
                        if (trimed.Length > 1)
                        {
                            if (responseHeader.IndexOf(trimed) > -1)
                            {
                                var tobeCut = "\n" + trimed;
                                responseHeader = responseHeader.Replace(tobeCut, "");
                                // for debug if ever run here .....this whole extraheadr feature is just exercise...not needed.. 
                                WPB("..atempted to remove headr:{0}, resulting headr:{1}", trimed, responseHeader);
                            }

                            if (trimed == "\n\n")
                            {
                                WPB("desire to input CRLF instead of headr? ..that will end headr block !!");
                            }

                            responseHeader += "\n" + trimed;
                        }
                    }
                }

                responseHeader += "\n\n";       //.. final row to mark end of headrs
            }

            return responseHeader;
        }

        private byte[] fetchFileContent(String filePath)
        {
            return File.ReadAllBytes(filePath);
        }
        private void processSimpleRequest(NetworkStream nStream)
        {
            byte[] buffer = new byte[2048];
            StringBuilder messageData = new StringBuilder();
            int bytes = -1;
            do
            {
                bytes = nStream.Read(buffer, 0, buffer.Length);

                Decoder decoder = Encoding.ASCII.GetDecoder();
                char[] chars = new char[decoder.GetCharCount(buffer, 0, bytes)];
                decoder.GetChars(buffer, 0, bytes, chars, 0);
                messageData.Append(chars);

                if (messageData.ToString().IndexOf("\r\n\r\n") > -1
                    || messageData.ToString().IndexOf("\n\n") > -1)
                {
                    break;
                }
            }
            while (bytes > 0);

            this.BeginInvoke(new MethodInvoker(delegate
            {
                if (vrbosePrint)
                    textBox1.Text += "\r\n" + "Payload Read: " + "\r\n" + messageData.ToString() + "\r\n";

            }));

            // GET /index.html HTTP/1.1
            var idxStart = messageData.ToString().IndexOf("GET ");
            var endIndex = messageData.ToString().IndexOf(" HTTP/1.1");

            String resourceUrl = messageData.ToString().Substring(idxStart + 4, endIndex - 4).Trim();

            prepareHttpSimpleResponse(resourceUrl, nStream);

        }

        private void processSecureRequest(SasyMax sslStream)
        {
            byte[] buffer = new byte[2048];
            StringBuilder messageData = new StringBuilder();
            int bytes = -1;
            do
            {
                bytes = sslStream.Read(buffer, 0, buffer.Length);

                Decoder decoder = Encoding.ASCII.GetDecoder();
                char[] chars = new char[decoder.GetCharCount(buffer, 0, bytes)];
                decoder.GetChars(buffer, 0, bytes, chars, 0);
                messageData.Append(chars);

                if (messageData.ToString().IndexOf("\r\n\r\n") > -1
                    || messageData.ToString().IndexOf("\n\n") > -1)
                {
                    break;
                }
            }
            while (bytes > 0);

            this.BeginInvoke(new MethodInvoker(delegate
            {
                if (vrbosePrint)
                    textBox1.Text += "\r\n" + "Payload Read: " + "\r\n" + messageData.ToString() + "\r\n";

            }));

            // GET /index.html HTTP/1.1
            var idxStart = messageData.ToString().IndexOf("GET ");
            var endIndex = messageData.ToString().IndexOf(" HTTP/1.1");

            if (idxStart < 0)
            {
                if (vrbosePrint)
                    WPA("other method than GET is not implemented !! >> msgData:\"{0}\", len:{1}", messageData, messageData.Length);
                idxStart = 0;                
            }
            if (messageData.Length > 0)
            {

                String resourceUrl = messageData.ToString().Substring(idxStart + 4, endIndex - 4).Trim();

                prepareHttpSecureResponse(resourceUrl, sslStream);
            }
        }

        private void prepareSslStream(TcpClient client)
        {
            var isReadingDetailsComplete = false;
            /*
            
            RemoteCertificateValidationCallback rmv = new RemoteCertificateValidationCallback((sender, certificate, chain, sslPolicyErrors) =>
            {
               // sslPolicyErrors = SslPolicyErrors.None;
                WPA("at remote RemoteCertificateValidationCallback {0}", certificate != null ? certificate.Subject : "-null-");
                return true;

            });
            
            
            LocalCertificateSelectionCallback lclr = new LocalCertificateSelectionCallback((sender, targetHost, localCertificates, remoteCertificate, acceptableIssuers) =>
            {
                WPA(">>> LocalCertificateSelectionCallback count:{0}, list:{1}", localCertificates.Count, acceptableIssuers.GivMEasOneRow("\x0D\x0A\x0D"));
              
                    
                return new X509Certificate2(sslCertificate);

            });
            */
            // SslStream sslStream = new SslStream(client.GetStream(), false);
            // SasyMax sslStream = new SasyMax(client.GetStream(), false, rmv, lclr, EncryptionPolicy.AllowNoEncryption);
            SasyMax sslStream = new SasyMax(client.GetStream(), false);


            try
            {
                // TLS 1.0 and 1.1 are deprecated in Chrome, Edge, Firefox and InternetExplorer 11
                SslProtocols protocols = System.Security.Authentication.SslProtocols.Tls
                    | System.Security.Authentication.SslProtocols.Tls11
                    | System.Security.Authentication.SslProtocols.Tls12
                    | System.Security.Authentication.SslProtocols.Tls13;

                //                    | System.Security.Authentication.SslProtocols.Ssl2
                //                  | System.Security.Authentication.SslProtocols.Ssl3;

                // this constantly System.Security.Authentication.AuthenticationException
                try
                {

                    // in any browser ....make sure you added the security exeption that browseer dictate to confirm ...about wrong selsigned untrustworty certificaate ..
                    // ..this is most critical part...
                    sslStream.AuthenticateAsServer(
                        sslCertificate,
                        clientCertificateRequired: false,
                        enabledSslProtocols: protocols,
                        checkCertificateRevocation: false
                        );

                    /*  ..to use this ...it needs to be adjuste the below quick close after calling this !!1
                    object baaagl = sslStream;
                    var socka = sslStream.BeginAuthenticateAsServer(sslCertificate, false, protocols, false, new AsyncCallback(iasjo => 
                    {
                        
                        SasyMax viniik = null;
                        if (iasjo != null)
                        {
                            if (iasjo.AsyncState != null)
                            {
                                if (iasjo.AsyncState is SasyMax)
                                {
                                    viniik = (SasyMax)iasjo.AsyncState;
                                }
                            }
                        }
                        if (viniik == null)
                            viniik = sslStream;

                        if (!viniik.isDiposed)
                            viniik.EndAuthenticateAsServer(iasjo);


                    }), baaagl);
                    */


                }
                catch (System.InvalidOperationException syr)
                {
                    if (vrbosePrint)
                        WPA("err invalidOper ..duringgg AuthenticateAsServer: {0}, inner:{1}\r\n", syr.Message, syr.InnerException);
                }
                catch (System.Security.Authentication.AuthenticationException aur)
                {
                    if (vrbosePrint)
                        WPA("err AuthenticationException: {0}, inner:{1}\r\n", aur.Message, aur.InnerException.ToString());
                    else
                        WPA("err AuthenticationException: {0}", aur.Message);
                    // whhen chhrome is conecting ...it produces a LOOOT of tthese
                    //A call to SSPI failed, see inner exception., inner:System.ComponentModel.Win32Exception (0x80004005): An unknown error occurred while processing the certificate
                    // anyway ...wen chrome is connecting(or anything else tham firefox) it will hevilly spam with throwed errors..
                    //...luckily the comunication seems still going...kind of usable...
                }
                catch (System.IO.IOException ioex)
                {
                    // most common ...Authentication failed because the remote party has closed the transport stream.
                    // ..happens in chromee and apparently it gous on ...
                    if (vrbosePrint)
                        WPA("err IO.IOException of AuthenticateAsServer: {0}, inner:{1} \r\n", ioex.Message, ioex.ToString());
                    else
                        WPA("err IO.IOException of AuthenticateAsServer: {0}", ioex.Message);
                }
                catch (Exception ouuur)
                {
                    // in chrom ..you will get a looot of theeese >>>
                    // err during AuthenticateAsServer: Authentication failed because the remote party has closed the transport stream.... ..folowed by
                    // err during AuthenticateAsServer: Unable to read data from the transport connection: An established connection was aborted by the software in your host machine
                    WPA("err during AuthenticateAsServer: {0}, inner:{1}\r\n", ouuur.Message, ouuur.ToString());
                }

                this.BeginInvoke(
                    new MethodInvoker(delegate
                    {

                        DisplayLogs(client, sslStream);
                        isReadingDetailsComplete = true;

                    }));

                sslStream.ReadTimeout = 60000;
                sslStream.WriteTimeout = 60000;

                // Read and Write to SSL Stream here 
                processSecureRequest(sslStream);

                while (!isReadingDetailsComplete) ;

                // Prevent stream from being disposed or closed till the UI thread writes the logs info
                sslStream.Close();
                client.Close();
            }
            catch (Exception ex)
            {
                // however ..it seems it needlesly gets here even when the error aleady appeared in inner trycatch abovve...
                // anyway ...wen chrome is connecting(or anything else tham firefox) it will hevilly spam with throwed errors..
                //...luckily the comunication seems still going...kind of usable...
                if (vrbosePrint)
                {
                    this.BeginInvoke(
                        new MethodInvoker(delegate
                        {

                            textBox1.Text += "errrrr \r\n" + ex.Message.ToString();
                            textBox1.Text += "\r\n" + ex.InnerException?.Message.ToString();
                            textBox1.Text += "\r\n";

                        }));
                } 
            }
            finally
            {
                sslStream.Close();
                client.Close();
            }
        }

        private void prepareSimpleStream(TcpClient client)
        {
            var isReadingDetailsComplete = false;

            NetworkStream nStream = client.GetStream();

            try
            {

                this.BeginInvoke(
                    new MethodInvoker(delegate
                    {
                        isReadingDetailsComplete = true;

                    }));

                nStream.ReadTimeout = 60000;
                nStream.WriteTimeout = 60000;

                // Read and Write to SSL Stream here 
                processSimpleRequest(nStream);

                while (!isReadingDetailsComplete) ;

                // Prevent stream from being disposed or closed till the UI thread writes the logs info
                nStream.Close();
                client.Close();
            }
            catch (Exception ex)
            {
                this.BeginInvoke(
                    new MethodInvoker(delegate
                    {

                        textBox1.Text += "errrrr \r\n" + ex.Message.ToString();
                        textBox1.Text += "\r\n" + ex.InnerException?.Message.ToString();
                        textBox1.Text += "\r\n";

                    }));
            }
            finally
            {
                nStream.Close();
                client.Close();
            }
        }

        public void ShifraKomplykacna(string speciCertFile, string speciKukejFile)
        {

            if (string.IsNullOrEmpty(speciCertFile))
                speciCertFile = certPath + "\\server.crt";
            //  if (string.IsNullOrEmpty(speciKukejFile))
            //    speciKukejFile = certPath + "\\server.key";

            if (!File.Exists(speciCertFile))
            {
                WPA("not found exist: {0}", speciCertFile);
                return;
            }
         
            try
            {

                //    var tamje = certPath + "\\server.crt"; //D:\WLOZ\wo\ITS\Crestron SW\sharp\_exportCWS\Cawsar\CuwaV4\Libs\reCreateHTTPsrv\httpFormSSLsrvv\SSL_Server\certs\tujcert.pem

                var certext = File.ReadAllText(speciCertFile);
                string keytext = "";
                if (!string.IsNullOrEmpty(speciKukejFile))
                {
                    keytext = File.ReadAllText(certPath + "\\server.key");
                }

                byte[] certifkuklaat = System.Text.Encoding.ASCII.GetBytes(certext);

                RSACryptoServiceProvider rsaPK = PEMToX509.GetRSA(keytext);
             
                WPA("rsa:{0}", rsaPK);
                //X509Certificate2 emptys = new X509Certificate2(certifkuklaat, "crestron", X509KeyStorageFlags.Exportable); 
                //,,,seems to be same as >>
                X509Certificate2 emptys = new X509Certificate2();
                //  emptys.Import(certifkuklaat, "", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);
                emptys.Import(certifkuklaat);

                emptys.PrivateKey = rsaPK;


                sslCertificate = emptys;
                WPA("ssl prep cert:{0}, hasprivkey:{1}", sslCertificate, sslCertificate.HasPrivateKey);

                // var exprtbytyA = emptys.Export(X509ContentType.Pfx);
                var exprtbytyA = emptys.GetRawCertData();
                var exprtbytyB = emptys.RawData;

                WPA("exprtbytyA:{0}, b:{1}, ", exprtbytyA.Length, exprtbytyB.Length);

                SaveFileDialog sag = new SaveFileDialog();
                sag.FileName = Path.GetFileNameWithoutExtension(speciCertFile) + "_combo.pfx";
                sag.InitialDirectory = Path.GetDirectoryName(speciCertFile);

                this.Invoke(new Action<SaveFileDialog>(suug =>
                {
                    if (sag.ShowDialog() == DialogResult.OK)
                    {
                        File.WriteAllBytes(sag.FileName, exprtbytyB);       // obviously useles...it exports crypted..and withou priv key
                        WPA("writed to:{0}", sag.FileName);
                    }

                }), sag);


                // var expo = emptys.Export(X509ContentType.Cert, "");           // same results as above
                var expo = emptys.Export(X509ContentType.Pfx, "crestron");       // this seems exports with priva ...but most se cannot read
                WPA("expo:{0}", expo.Length);
                if (expo.Length > 0)
                {
                    var autoname = Path.GetDirectoryName(speciCertFile) + "\\seru_cubu.pfx";
                    File.WriteAllBytes(autoname, expo);
                }


            }
            catch (Exception ex)
            {
                WPA("shifrakomplykacna:{0}", ex.Message);
            }
        }

        /// <summary>
        /// first suceful programatical combo of two files to create one with key
        /// </summary>
        private void getCertificate()
        {
            try
            {
                /*
                var cert = X509Certificate2.CreateFromPemFile(
                     certPath + "/server.crt", certPath + "/server.key"
                    );
                */

                // openssl x509 -outform der -in server.pem -out server.crt
                // openssl pkcs12 -export -out server.pfx -inkey server.key -in server.pem -certfile ca.pem
                /*
                var pem = System.IO.File.ReadAllText(certPath + "\\server.key");
                WPA("reeaded:{0}", pem.Length);
                byte[] certBuffer = GetBytesFromPEM(pem, "CERTIFICATE");
                var certificate = new X509Certificate2(certBuffer);
                WPA("cer:{0}", certificate);
                var cert = new X509Certificate2(certPath + "\\server.crt", certPath + "\\server.key");

                sslCertificate = new X509Certificate2(cert.Export(X509ContentType.Pfx, "password"), "password");
                WPA("sslCertificate:{0}, has privky:{1}", sslCertificate, sslCertificate.HasPrivateKey);
                PEMToX509
                */

                //  var tamje = certPath + "\\server.crt"; //D:\WLOZ\wo\ITS\Crestron SW\sharp\_exportCWS\Cawsar\CuwaV4\Libs\reCreateHTTPsrv\httpFormSSLsrvv\SSL_Server\certs\tujcert.pem

                var keytext = File.ReadAllText(certPath + "\\server.key");
                var certext = File.ReadAllText(certPath + "\\server.crt");

                byte[] pemCertWithPrivateKey = System.Text.Encoding.ASCII.GetBytes(certext);

                RSACryptoServiceProvider rsaPK = PEMToX509.GetRSA(keytext);
                WPA("rsa:{0}", rsaPK);
                X509Certificate2 emptys = new X509Certificate2();
                emptys.Import(pemCertWithPrivateKey, "", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);

                emptys.PrivateKey = rsaPK;

                //  var tuj = new X509Certificate(tamje, "password");

                //  var tuj = X509Certificate2.CreateFromSignedFile(tamje);
                //  var patujj = new X509Certificate2(tuj.Export(X509ContentType.Pfx, "crestron"), "crestron");
                // var patujj = new X509Certificate2(tuj.GetRawCertData(), "crestron");
                //var patujj = new X509Certificate2(tuj.Export(X509ContentType.Pfx, "password"), "password");
                //WPA("sslCtujertificate:{0}, has privky:{1}", patujj, patujj.HasPrivateKey);
                //WPA("sslCertificate:{0}, has privky:{1}", sslCertificate, sslCertificate.HasPrivateKey);
                sslCertificate = emptys;
                WPA("ssl:{0}, {1}", sslCertificate, sslCertificate.HasPrivateKey);


            }
            catch (Exception ex)
            {
                WPA("err:{0}", ex.Message);
            }
        }
        /// <summary>
        /// simple load cert for use for server 
        /// </summary>
        /// <param name="speciFilename"></param>
        /// <param name="optionalpass"></param>
        private void getSpeciCertificate(string speciFilename, string optionalpass)
        {
            if (string.IsNullOrEmpty(speciFilename)) return;
            if (!File.Exists(speciFilename)) return;

            WPA("preparing cert:{0}", Path.GetFileName(speciFilename));

            X509Certificate2 tmpc = null;
            try
            {
                if (string.IsNullOrEmpty(optionalpass))
                    tmpc = new X509Certificate2(speciFilename);
                else
                    tmpc = new X509Certificate2(speciFilename, optionalpass);
            }
            catch (Exception cerlor)
            {
                WPA("cerspec cert iFilename load err:{0}", cerlor.Message);
                return;
            }

            if (tmpc != null)
            {
                WPA("cerhav:{0}, HAVE private key:{1}", tmpc.ToString(), tmpc.HasPrivateKey);
                if (!tmpc.HasPrivateKey)
                {
                    WPA("curently loaded cert:{0}, DOES not have private Key !!, therefore the server WILL fail when client atempts connect !!", tmpc.Thumbprint);
                }
                sslCertificate = tmpc;
            }
        }

        byte[] GetBytesFromPEM(string pemString, string section)
        {
            var header = String.Format("-----BEGIN {0}-----", section);
            var footer = String.Format("-----END {0}-----", section);

            var start = pemString.IndexOf(header, StringComparison.Ordinal);
            if (start < 0)
                return null;

            start += header.Length;
            var end = pemString.IndexOf(footer, start, StringComparison.Ordinal) - start;

            if (end < 0)
                return null;

            return Convert.FromBase64String(pemString.Substring(start, end));
        }

        /// <summary>
        /// TCP NON ssl server listner, ment for bridge to SSL client
        /// </summary>
        private TcpListener tcpBridgeListener = null;
        private bool keepBridgeListenerThreadAlive = true;

        /// <summary>
        /// https server listener 
        /// </summary>
        private TcpListener tcpListener;
        private volatile bool keepThreadAlive = true;


        void delayedAfterStart()
        {
           // WPB("..delayed AfterStart... we are background: {0}", Thread.CurrentThread.IsBackground);
          
            if (checkBox_autoStartServer.Checked)
            //if (checkBox_autoStartServer.boolCheckBoxSafeReader())
            {
                WPB("going to auto start https + wss ...");
                SUFLER(StartServersPlural);
            }

        }

        /// <summary>
        /// combo starter...
        /// </summary>
        public void StartServersPlural()
        {
            StartServer();
            if (checkBox1_wssYes.Checked)
                SUFLER_ASN(syyysWStest, string.Empty);
        }       
        public void StartServer()
        {
            //  certPath = rootPathUrl + "/certs";
            //wwwPath = rootPathUrl + "/www";

            textBox1.Text = "";

            if (SecureUse)
            {
                if (sslCertificate == null)
                {
                    if (!string.IsNullOrEmpty(textBox5_certifPath.Text))
                    {
                        //  selectCustomCert(textBox5_certifPath.Text);
                        // ..sadly calling above ..is async ..wont finish in timee !!!
                        var custoCertPasss = textBox3.txtBoxSafeReader();
                        var custoCertPath = textBox5_certifPath.txtBoxSafeReader();

                        if (string.IsNullOrEmpty(custoCertPasss))
                            custoCertPasss = "crestron";

                        SUFLER(getSpeciCertificate, custoCertPath, custoCertPasss);
                    }
                    else
                    {
                        SUFLER(getSpeciCertificate, Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\seru_cubu.pfx", "crestron");
                    }
                }
            }
            else
            {
                WPB("making UNSECURE http serveer");
            }


            // extra mimes prep
            if (FileTypesEX == null)
            {
                var MimozyEX = new MIMEdic();
                FileTypesEX = MimozyEX.FileTypes;
            }

            vrbosePrint = checkBox1_vrbos.Checked;

            if (!string.IsNullOrEmpty(textBox5_port.Text))
            {
                var jakyportTedy = string.Copy(textBox5_port.Text);
                if (!int.TryParse(jakyportTedy, out cuustPortLisen))
                {
                    cuustPortLisen = 9999;
                }
                var zpetnattext = cuustPortLisen.ToString();
                // avoid looping trigering of textchanged  event..which doing the same codde !!
                if (textBox5_port.Text != zpetnattext)
                    textBox5_port.Text = zpetnattext;
            }

            IPAddress listenIPaDres = IPAddress.Any;
            if (!string.IsNullOrEmpty(textBox5_ip.Text))
            {
                var posibleIPa = textBox5_ip.Text.Trim();
                custIPlistAdres = string.Copy(posibleIPa);

                if (IPAddress.TryParse(custIPlistAdres, out listenIPaDres))
                {
                    custIPlistAdres = listenIPaDres.ToString();
                    textBox5_ip.Text = custIPlistAdres;
                }
                else
                {
                    listenIPaDres = IPAddress.Any;
                    textBox5_ip.Text = "0.0.0.0"; // listenDres.ToString();
                }
            }

            Start_Server.Enabled = false;
            Stop_Server.Enabled = true;

            keepThreadAlive = true;

            if (SecureUse && sslCertificate == null)
            {
                WPB(".. sslCertificate still null !! ");
                getCertificate();
            }

            if (SecureUse && vrbosePrint)
            {
                textBox1.Text += "\r\n certSN:" + sslCertificate.GetSerialNumberString();
                textBox1.Text += "\r\n certTill:" + sslCertificate.NotAfter.ToString();
                textBox1.Text += "\r\n certFrom:" + sslCertificate.NotBefore.ToString();
                textBox1.Text += "\r\n";
            }

            thread = new Thread(() =>
            {

                tcpListener = new TcpListener(listenIPaDres, cuustPortLisen);

                // for case we supply some wrong ip adres and etc... have it in trychatz
                try
                {
                    tcpListener.Start();
                }
                catch (SocketException staaEr)
                {
                    WPA("SocketException during listener start:{0}", staaEr.Message);
                    return;
                }
                catch (Exception Er)
                {
                    WPA("Exception duringlistener start:{0}", Er.Message);
                    return;
                }

                WPB("tcp listener STARTED on:{0}", tcpListener.LocalEndpoint.ToString());
                WPB("may try:\x0D\x0A {2}://{0}:{1}", 
                    (listenIPaDres.ToString() == "0.0.0.0" ? "127.0.0.1" : listenIPaDres.ToString()), 
                    cuustPortLisen, 
                    SecureUse ? "https" : "http");

                if (asyPreperSecure == null)
                    asyPreperSecure = new Action<TcpClient>(prepareSslStream);
                if (asyPreperSimple == null)
                    asyPreperSimple = new Action<TcpClient>(prepareSimpleStream);

                while (true && keepThreadAlive)
                {
                    try
                    {
                        TcpClient client = tcpListener.AcceptTcpClient();
                        if (SecureUse)
                            asyPreperSecure.BeginInvoke(client, null, client);
                        else
                            asyPreperSimple.BeginInvoke(client, null, client);

                        /*  ..blocking 
                        if (SecureUse)
                            prepareSslStream(client);
                        else
                            prepareSimpleStream(client);
                        */

                    }
                    catch (Exception ex) { WPB("AcceptTcpClient shitfail:{0}", ex.Message); }

                }
            });

            thread.Start();
        }

        Action<TcpClient> asyPreperSecure = null;
        Action<TcpClient> asyPreperSimple = null;
        private void Start_Server_Click(object sender, EventArgs e)
        {
            // StartServer();
            StartServersPlural();
//             SUFLER_ASN(syyysWStest, "C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\Debug\\SSL_Server\\certs\\ponsite.pfx;crestron");
        }

        private void Stop_Server_Click(object sender, EventArgs e)
        {
            Start_Server.Enabled = true;
            //  Stop_Server.Enabled = false;
            if(checkBox1_wssYes.Checked)
                SUFLER_ASN(webSuckStop);

            try
            {
                keepThreadAlive = false;
                tcpListener.Stop();
            }
            catch (Exception ex) { WPB("on stop err:{0}", ex.Message); }
        }
        private void Form1_Load(object sender, EventArgs e)
        {
            rootPathUrl = Directory.GetCurrentDirectory() + "\\SSL_Server";
            certPath = rootPathUrl + "\\certs";
            wwwPath = rootPathUrl + "\\www";

            textBox4.Text = wwwPath;

            SUFLER_ASN(gaadherAndSaveTxtFields, "load");
            
            hideShowShamefullControls();

            poluteCRPCoferbox();
            //  attachsomeTooltips();

            //   Action<int> waitHolder = new Action<int>(tukejTakDluuho);       // << async thread waiter
            //   var kapsaNaToApakNaAkcii = new object[] { waitHolder, new Action(delayedAfterStart) };      // ..what to do after in callback when waiter finishes..
            //   waitHolder.BeginInvoke(1500, new AsyncCallback(tukejKalba), kapsaNaToApakNaAkcii);
            plaanLateRun(1500, delayedAfterStart);
        }


        // little research ....how to go to NOT backround NOT asynchronous call back to normal one...
        #region someWay to async wait and then continue SYNC passed method
        public void plaanLateRun(int msTowait, Action toBeRunnedAfterThat, params object[] opionalTopass)
        {
            Delegate gaate = toBeRunnedAfterThat;
            plaanLateRun(msTowait, gaate, opionalTopass);
        }
        public void plaanLateRun(int msTowait, Action<object> toBeRunnedAfterThat, params object[] opionalTopass)
        {
            Delegate gaate = toBeRunnedAfterThat;
            plaanLateRun(msTowait, gaate, opionalTopass);
        }
        public void plaanLateRun(int msTowait, Action<object[]> toBeRunnedAfterThat, params object[] opionalTopass)
        {
            Delegate gaate = toBeRunnedAfterThat;
            plaanLateRun(msTowait, gaate, opionalTopass);
        }
        public void plaanLateRun(int msTowait, Delegate toBeRunnedAfterThat, params object[] opionalTopass)
        {
            Action<int> waitHolder = new Action<int>(tukejTakDluuho);       // << async thread waiter
            List<object> prepakl = new List<object>();
            prepakl.Add(waitHolder);
            prepakl.Add(toBeRunnedAfterThat);
            if (opionalTopass != null && opionalTopass.Length > 0)
                prepakl.AddRange(opionalTopass);
            var kapsaNaToApakNaAkcii = prepakl.ToArray();      // ..what to do after in callback when waiter finishes..

            waitHolder.BeginInvoke(1500, new AsyncCallback(tukejKalba), kapsaNaToApakNaAkcii);
        }
        void tukejTakDluuho(int msTowait)
        {
            //   WPB("tukej waiting go for:{0}", msTowait);
            Thread.Sleep(msTowait);
            //   WPA("tukej... after sleep ..is background:{0}", Thread.CurrentThread.IsBackground);
            return;
        }
        void tukejKalba(IAsyncResult arsen)
        {
            object[] kapsa = (object[])arsen.AsyncState;
            Action<int> waitHolder = (Action<int>)kapsa[0];
            waitHolder.EndInvoke(arsen);        // ..not helping...

            //   WPA("..tukej kalba .. isbackgoundThread:{0}, arsen.CompletedSynchronously:{1}", Thread.CurrentThread.IsBackground, arsen.CompletedSynchronously);      // ..sadly ..is TRUE... is background !!!
            // Action<object> normalovaa = new Action<object>(netukejKurwa);
            //normalovaa.Invoke(kapsa[1]);          // ..ee
            // normalovaa.DynamicInvoke(kapsa[1]);      // ..ee

            // ...>>> that way go back tomain thread...
            //     Form1.meForm1.Invoke(normalovaa, kapsa[1]);       // ..ok

            // if (kapsa[1] is Delegate)
            //   WPA("..jjo j to degeen... {0}", kapsa[1].GetType().Name);     // ..indeeed it reports to be delegate !!
            // ... so ...lets try to formulate some posibly reusable mechanics..
            if (kapsa.Length > 1 && kapsa[1] != null)
            {
                var txtFormName = kapsa[1].GetType().Name;      // ..to resolve if Action or Func
                if (txtFormName.IndexOf("Func", StringComparison.InvariantCultureIgnoreCase) < 0)
                {
                    if (kapsa[1] is Action)
                    {
                        Action aa = (Action)kapsa[1];
                        //SUFLER(aa);
                        Form1.meForm1.Invoke(aa);
                    }
                    else if (kapsa[1] is Action<object>)
                    {
                        Action<object> aa = (Action<object>)kapsa[1];
                        if (kapsa.Length > 2)
                            Form1.meForm1.Invoke(aa, kapsa[2]);
                        else
                            Form1.meForm1.Invoke(aa, null);
                    }
                    else if (kapsa[1] is Action<object, object>)
                    {
                        Action<object, object> aa = (Action<object, object>)kapsa[1];
                        if (kapsa.Length > 3)
                            Form1.meForm1.Invoke(aa, kapsa[2], kapsa[3]);
                        else
                            Form1.meForm1.Invoke(aa, null, null);
                    }
                    if (kapsa[1] is Action<object[]>)
                    {
                        Action<object[]> aa = (Action<object[]>)kapsa[1];
                        if (kapsa.Length > 2)
                        {
                            object[] prasans = new object[kapsa.Length - 2];

                            Array.Copy(kapsa, 2, prasans, 0, prasans.Length);
                            Form1.meForm1.Invoke(aa, prasans);
                        }
                        else
                            Form1.meForm1.Invoke(aa, null);
                    }
                    //...and so on...
                }
                else
                {
                    WPA("after kalbing of Func type degen NOT IMPL YET.. its>> {0}", txtFormName);
                    if (kapsa[1] is Func<object, object>)
                    {
                        Func<object, object> ff = (Func<object, object>)kapsa[1];
                        if (kapsa.Length > 2)
                        {
                            Form1.meForm1.Invoke(ff, kapsa[2]);
                            //ff.Invoke(kapsa[2]);
                        }
                        else
                            Form1.meForm1.Invoke(ff, null);

                    }
                }
            }
        }
        /*
        void netukejKurwa(object neco)
        {
            WPA("netukejKurwa.....is background:{0}", Thread.CurrentThread.IsBackground);   // ...still saying its background !!!
        }
        */

        #endregion someWay to async wait and then continue SYNC passed method...of.

        private void poluteCRPCoferbox()
        {
            var zbubirka = new List<crpcSnipets>();
            zbubirka.Add(new crpcSnipets("backTOP", "{\"params\":null,\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.BackToTop\",\"id\":69802}"));
            zbubirka.Add(new crpcSnipets("BACK", "{\"method\":\"MediaPlayerMenu1.Back\",\"id\":28055,\"params\":null,\"jsonrpc\":\"2.0\"}"));
            zbubirka.Add(new crpcSnipets("SELECT", "{\"method\":\"MediaPlayerMenu1.Select\",\"id\":6563,\"jsonrpc\":\"2.0\",\"params\":{\"item\":1}}"));
            zbubirka.Add(new crpcSnipets("GetData", "{\"jsonrpc\":\"2.0\",\"params\":{\"count\":50,\"item\":1},\"method\":\"MediaPlayerMenu1.GetData\",\"id\":88806}"));
            zbubirka.Add(new crpcSnipets("ItemCNT", "{\"method\":\"MediaPlayerMenu1.GetProperty\",\"id\":6543,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"ItemCnt\"}}"));
            zbubirka.Add(new crpcSnipets("statusMsgResponsMenu", "{\"method\":\"MediaPlayerMenu1.StatusMsgResponseMenu\",\"id\":6568,\"jsonrpc\":\"2.0\",\"params\":{\"localExit\":false,\"state\":1,\"id\":1,\"userInput\":\"\"}}"));
            zbubirka.Add(new crpcSnipets("statusMsgINPUTResponsMenu", "{\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.StatusMsgResponseMenu\",\"id\":20443,\"params\":{\"userInput\":\"-WHATSEARCH-\",\"state\":1,\"id\":1,\"localExit\":false}}"));
            zbubirka.Add(new crpcSnipets("StatusMsgMenu", "{\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.GetProperty\",\"id\":20445,\"params\":{\"propName\":\"StatusMsgMenu\"}}"));
           
            zbubirka.Add(new crpcSnipets("textlines", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6499,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"TextLines\"}}"));
            zbubirka.Add(new crpcSnipets("StreamState", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6505,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"StreamState\"}}"));

            zbubirka.Add(new crpcSnipets("Create", "{\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.Create\",\"id\":20401,\"params\":null}"));
            zbubirka.Add(new crpcSnipets("Favorites", "{\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.Favorites\",\"id\":20407,\"params\":null}"));
            zbubirka.Add(new crpcSnipets("ListSpecificFunctions", "{\"jsonrpc\":\"2.0\",\"method\":\"MediaPlayerMenu1.GetProperty\",\"id\":20444,\"params\":{\"propName\":\"ListSpecificFunctions\"}}"));
            zbubirka.Add(new crpcSnipets("ActionsAvailable", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6501,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"ActionsAvailable\"}}"));
            zbubirka.Add(new crpcSnipets("Instance", "{\"method\":\"MediaPlayerMenu1.GetProperty\",\"id\":6560,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"Instance\"}}"));
            
            zbubirka.Add(new crpcSnipets("progresBas", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6502,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"ProgressBar\"}}"));
            zbubirka.Add(new crpcSnipets("trackSec", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6504,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"TrackSec\"}}"));
            zbubirka.Add(new crpcSnipets("elapsed", "{\"method\":\"MediaPlayer1.GetProperty\",\"id\":6596,\"jsonrpc\":\"2.0\",\"params\":{\"propName\":\"ElapsedSec\"}"));
            //so calleed events regustering..
            zbubirka.Add(new crpcSnipets("ev_statusMenu", "{\"method\":\"MediaPlayerMenu1.RegisterEvent\",\"id\":6524,\"jsonrpc\":\"2.0\",\"params\":{\"ev\":\"StatusMsgMenuChanged\",\"handle\":\"sg\"}}"));
            zbubirka.Add(new crpcSnipets("ev_listChangd", "{\"method\":\"MediaPlayerMenu1.RegisterEvent\",\"id\":6522,\"jsonrpc\":\"2.0\",\"params\":{\"ev\":\"ListChanged\",\"handle\":\"sg\"}}"));
            zbubirka.Add(new crpcSnipets("ev_stateChanged", "{\"method\":\"MediaPlayerMenu1.RegisterEvent\",\"id\":6523,\"jsonrpc\":\"2.0\",\"params\":{\"ev\":\"StateChanged\",\"handle\":\"sg\"}}"));

            //  comboBox1.DataSource = new Dictionary<string,string>();
            comboBox1.DataSource = zbubirka;
            comboBox1.DisplayMember = "Key";
        }

        public class crpcSnipets
        {
            public string Key
            { get; set; }
            public string Value { get; set; }
            public crpcSnipets()
            {
            }
            public crpcSnipets(string key, string value)
            {
                this.Key = key;
                this.Value = value;
            }
        }

        /// <summary>
        /// letsay we offer this for testing to someone..hide experrimental func controls
        /// </summary>
        void hideShowShamefullControls()
        {
            var decidingFilepatha = Directory.GetCurrentDirectory() + "\\NotDev.txt";
            if (File.Exists(decidingFilepatha))
            {
                this.button1.Visible = false;
                this.button2.Visible = false;
                this.button3.Visible = false;
                this.button5.Visible = false;
                this.button6.Visible = false;
                this.button9.Visible = false;
                this.button8.Visible = false;
                this.button7.Visible = false;
            }
        }
        /*
        void attachsomeTooltips()
        {
            ToolTip to1 = new ToolTip();
            to1.ShowAlways = true;
          
            to1.SetToolTip(textBox4, "default www file");
        }
        */

        private void button1_Click(object sender, EventArgs e)
        {
            // MessageBox.Show(string.Format("{0}", Directory.GetCurrentDirectory()));
            getCertificate();

        }

        public void WpPA(string msg)
        {
            WPA("{0}", msg);
        }
        public void WpPA(string msg, params object[] data)
        {
            if (data == null || data.Length < 1)
                data = new object[] { msg };

            if (textBox1.InvokeRequired)
            {
                textBox1.Invoke(new Action<string, object[]>(WPA), msg, data);
            }
            else
            {
                var prettextt = string.Format(msg + "\x0A\x0D", data);
                textBox1.AppendText(prettextt);
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            //WPA("aasfafa", "rrr");
            OpenFileDialog ogo = new OpenFileDialog();
            ogo.Title = "certtttttttttt";
            ogo.Multiselect = true;
            var paarentdiira = Directory.GetParent(Directory.GetCurrentDirectory());
            if (paarentdiira.Name == "bin")
                paarentdiira = paarentdiira.Parent;

            //     WPA("parentdiira {0}", paarentdiira.FullName);

            ogo.InitialDirectory = paarentdiira.FullName + "\\SSL_Server";
            if (ogo.ShowDialog() == DialogResult.OK)
            {
                var firstfil = ogo.FileName;
                if (!string.IsNullOrEmpty(firstfil))
                {
                    ogo.Title = "now KEY";
                    ogo.FileName = Path.GetFileNameWithoutExtension(firstfil) + ".key";
                    ogo.InitialDirectory = Path.GetDirectoryName(firstfil);
                    if (ogo.ShowDialog() == DialogResult.OK)
                    {
                        if (ogo.FileName != null && File.Exists(ogo.FileName))
                        {
                            SUFLER_ASN(ShifraKomplykacna, firstfil, ogo.FileName);
                            return;
                        }
                    }

                    SUFLER_ASN(ShifraKomplykacna, firstfil, string.Empty);

                }
            }

        }

        private void button3_Click(object sender, EventArgs e)
        {
            //SUFLER_ASN(WPA, "tramta daaa");
            textBox1.Clear();
            OpenFileDialog gog = new OpenFileDialog();
            if (lastdirmemo == null)
                gog.InitialDirectory = rootPathUrl;
            else
                gog.InitialDirectory = lastdirmemo;

            if (gog.ShowDialog() == DialogResult.OK)
            {
                var optipass = textBox3.Text;
                lastdirmemo = Path.GetDirectoryName(gog.FileName);
                SUFLER_ASN(readTheCert, string.Copy(gog.FileName), optipass);
                gog.Dispose();
            }

        }

        string lastdirmemo = null;
        X509Certificate2 globExamed { get; set; }
        void readTheCert(string selfile, string optionalpass)
        {
            if (string.IsNullOrEmpty(selfile)) return;
            if (File.Exists(selfile))
            {
                WPA("goingfor:{0}", selfile);
                X509Certificate2 tmpc = null;
                try
                {
                    if (string.IsNullOrEmpty(optionalpass))
                        tmpc = new X509Certificate2(selfile);
                    else
                        tmpc = new X509Certificate2(selfile, optionalpass);
                }
                catch (Exception cerlor) { WPA("cer load err:{0}", cerlor.Message); }
                if (tmpc != null)
                {
                    globExamed = tmpc;
                    WPA("and have:{0}, raw:{1}, haspriv:{2}", tmpc.ToString(), tmpc.GetRawCertData().GivmeRow(";", "{0:X2}"), tmpc.HasPrivateKey);
                    if (tmpc.HasPrivateKey)
                    {
                        WPA("hisprivat: {0}", tmpc.PrivateKey.ToString());
                        if (tmpc.PrivateKey is RSA)
                        {
                            WPA("rsa : {0}", tmpc.GetRSAPrivateKey().ToString());
                        }
                    }

                }
            }
        }

#region Printers
        /// <summary>
        /// ment for WPx printerts as safe way to always print without hick-up
        /// </summary>
        /// <param name="arToDescribe"></param>
        /// <returns></returns>
        object[] sufeputamadra(object[] arToDescribe)
        {
            if (arToDescribe != null && arToDescribe.Length > 0)
            {
                object[] prozzry = new object[arToDescribe.Length];
                for (int i = 0; i < arToDescribe.Length; i++)
                {
                    if (arToDescribe[i] == null)
                    {
                        prozzry[i] = i.ToString() + " null";
                    }
                    else
                    {
                        prozzry[i] = arToDescribe[i];
                    }
                }
                return prozzry;
            }
            else
            {
                return new object[] { };
            }
            //  return arToDescribe;
        }

        public void WPA(string totoFormat, params object[] pudrans)
        {
            var safkypadafky = sufeputamadra(pudrans);

            if (textBox1.InvokeRequired)
            {
                textBox1.Invoke(new TALK(WPA), new object[] { totoFormat, safkypadafky });
            }
            else
            {
                if (textBox1.IsDisposed) return;
                textBox1.AppendText(string.Format(totoFormat + "\n", safkypadafky));
                textBox1.Text += "\x0D\x0A";
                textBox1.ScrollToCaret();
            }
        }
        public void WPA(string toto)
        {
            if (textBox1.InvokeRequired)
            {
                textBox1.Invoke(new Action<string>(WPA), new object[] { toto });
            }
            else
            {
                textBox1.AppendText(toto + "\n");
                textBox1.Text += "\x0D\x0A";

                textBox1.ScrollToCaret();
            }
        }
        public void WPB(string totoFormat, params object[] pudrans)
        {
            var safkypadafky = sufeputamadra(pudrans);

            if (textBox2.InvokeRequired)
            {
                textBox2.Invoke(new TALK(WPB), new object[] { totoFormat, safkypadafky });
            }
            else
            {
                if (textBox2.IsDisposed) return;
                textBox2.AppendText(string.Format(totoFormat + "\n", safkypadafky));
                textBox2.Text += "\x0D\x0A";
                textBox2.ScrollToCaret();
            }
        }
        public void WPB(string toto)
        {
            if (textBox2.InvokeRequired)
            {
                textBox2.Invoke(new Action<string>(WPB), new object[] { toto });
            }
            else
            {
                textBox2.AppendText(toto + "\n");
                textBox2.Text += "\x0D\x0A";

                textBox2.ScrollToCaret();
            }
        }

#endregion Printers eend...

        private void button4_Click(object sender, EventArgs e)
        {
      
            textBox2.Clear();
        }

        private void button16_Click(object sender, EventArgs e)
        {
            textBox1.Clear();
        }


        #region suflers

        void SUFLER(Action dg)
        {
            try
            {
                dg.Invoke();
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message);
                return;
            }
        }
        void SUFLER<T>(Action<T> dg, T t)
        {
            try
            {
                dg.Invoke(t);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message);
                return;
            }
        }
        void SUFLER<T, B>(Action<T, B> dg, T t, B b)
        {
            try
            {
                dg.Invoke(t, b);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message);
                return;
            }
        }
        void SUFLER<T, B, C>(Action<T, B, C> dg, T t, B b, C c)
        {
            try
            {
                dg.Invoke(t, b, c);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message);
                return;
            }
        }
        // ASN

        void SUFLER_ASN(Action dg)
        {
            try
            {
                Action<Action> mar = SUFLER;
                mar.BeginInvoke(dg, AFTERsufler, dg);
                //  dg.BeginInvoke(AFTERsufler, dg);              // takhle to nejede coby exeption ...osetreni
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message + " in:" + dg.Method.Name);
                return;
            }
        }
        void SUFLER_ASN<T>(Action<T> dg, T t)
        {
            try
            {
                new Action<Action<T>, T>((ddgg, TT) =>
                {
                    SUFLER(ddgg, TT);
                }).BeginInvoke(dg, t, AFTERsufler, dg);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message + " in:" + dg.Method.Name);
                return;
            }
        }
        void SUFLER_ASN<T, B>(Action<T, B> dg, T t, B b)
        {
            try
            {
                new Action<Action<T, B>, T, B>((aa, TT, BB) =>
                {
                    SUFLER(aa, TT, BB);

                }).BeginInvoke(dg, t, b, AFTERsufler, dg);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message + " in:" + dg.Method.Name);
                return;
            }
        }
        void SUFLER_ASN<T, B, C>(Action<T, B, C> dg, T t, B b, C c)
        {
            try
            {
                new Action<Action<T, B, C>, T, B, C>((aa, TT, BB, CC) =>
                {
                    SUFLER(aa, TT, BB, CC);

                }).BeginInvoke(dg, t, b, c, AFTERsufler, dg);
                return;
            }
            catch (Exception er)
            {
                WPA(er.Message + " in:" + dg.Method.Name);
                return;
            }
        }

        void AFTERsufler(IAsyncResult ar)
        {
        }


        #endregion


        #region ceerconver

        /// <summary>
        /// key obtaining explore
        /// </summary>
        /// <param name="certFileee"></param>
        public void exampleOFusingaboveee(string certFileee)
        {
            var targetpluta = string.IsNullOrEmpty(certFileee) ? (certPath + "\\server.key") : certFileee;
            if (!File.Exists(targetpluta)) return;
            string pemCertWithPrivateKeyText = System.IO.File.ReadAllText(targetpluta);
            //tring pemCertWithPrivateKeyText = System.IO.File.ReadAllText(certPath + "\\server.crt"); 
            WPA("reading Convert from:{0}", targetpluta);

            X509Certificate2 cert = PEMToX509.Convert(pemCertWithPrivateKeyText);
            // WPA("resu cert:{0}",cert?.ToString());
            if (cert != null)
                WPA("cert has privakey:{0}", (cert.HasPrivateKey));
        }

        public static class PEMToX509
        {
            const string KEY_HEADER = "-----BEGIN RSA PRIVATE KEY-----";
            const string KEY_FOOTER = "-----END RSA PRIVATE KEY-----";

            internal static X509Certificate2 Convert(string pem)
            {
                try
                {
                    byte[] pemCertWithPrivateKey = System.Text.Encoding.ASCII.GetBytes(pem);

                    RSACryptoServiceProvider rsaPK = GetRSA(pem);

                    X509Certificate2 cert = new X509Certificate2();
                    //   cert.Import(pemCertWithPrivateKey, "", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);
                    cert.Import(pemCertWithPrivateKey, "password", X509KeyStorageFlags.MachineKeySet | X509KeyStorageFlags.PersistKeySet);
                    //
                    if (rsaPK != null)
                    {
                        cert.PrivateKey = rsaPK;
                    }

                    return cert;
                }
                catch (Exception ner)
                {
                    Form1.gWPA("nerr:{0}", ner.Message);
                    return null;
                }
            }

            public static RSACryptoServiceProvider GetRSA(string pem)
            {
                RSACryptoServiceProvider rsa = null;

                if (IsPrivateKeyAvailable(pem))
                {
                    RSAParameters privateKey = DecodeRSAPrivateKey(pem);

                    gWPA("decoded private to params:{0}", privateKey.ToString());

                    SecurityIdentifier everyoneSI = new SecurityIdentifier(WellKnownSidType.WorldSid, null);
                    CryptoKeyAccessRule rule = new CryptoKeyAccessRule(everyoneSI, CryptoKeyRights.FullControl, AccessControlType.Allow);

                    CspParameters cspParameters = new CspParameters();
                    cspParameters.KeyContainerName = "MY_C_NAME";
                    cspParameters.ProviderName = "Microsoft Strong Cryptographic Provider";
                    cspParameters.ProviderType = 1;
                    //  cspParameters.Flags = CspProviderFlags.UseNonExportableKey | CspProviderFlags.UseMachineKeyStore;
                    cspParameters.Flags = CspProviderFlags.UseMachineKeyStore;      // after chaning this ...it can be latery export as pfx with key

                    cspParameters.CryptoKeySecurity = new CryptoKeySecurity();
                    cspParameters.CryptoKeySecurity.SetAccessRule(rule);

                    rsa = new RSACryptoServiceProvider(cspParameters);
                    rsa.PersistKeyInCsp = true;
                    rsa.ImportParameters(privateKey);
                }

                return rsa;
            }

            public static bool IsPrivateKeyAvailable(string privateKeyInPEM)
            {
                return (privateKeyInPEM != null && privateKeyInPEM.Contains(KEY_HEADER)
                    && privateKeyInPEM.Contains(KEY_FOOTER));
            }

            public static RSAParameters DecodeRSAPrivateKey(string privateKeyInPEM)
            {
                if (IsPrivateKeyAvailable(privateKeyInPEM) == false)
                    throw new ArgumentException("bad format");

                string keyFormatted = privateKeyInPEM;

                int cutIndex = keyFormatted.IndexOf(KEY_HEADER);
                keyFormatted = keyFormatted.Substring(cutIndex, keyFormatted.Length - cutIndex);
                cutIndex = keyFormatted.IndexOf(KEY_FOOTER);
                keyFormatted = keyFormatted.Substring(0, cutIndex + KEY_FOOTER.Length);
                keyFormatted = keyFormatted.Replace(KEY_HEADER, "");
                keyFormatted = keyFormatted.Replace(KEY_FOOTER, "");
                keyFormatted = keyFormatted.Replace("\r", "");
                keyFormatted = keyFormatted.Replace("\n", "");
                keyFormatted = keyFormatted.Trim();

                byte[] privateKeyInDER = System.Convert.FromBase64String(keyFormatted);

                byte[] paramModulus;
                byte[] paramDP;
                byte[] paramDQ;
                byte[] paramIQ;
                byte[] paramE;
                byte[] paramD;
                byte[] paramP;
                byte[] paramQ;

                MemoryStream memoryStream = new MemoryStream(privateKeyInDER);
                BinaryReader binaryReader = new BinaryReader(memoryStream);
             
                ushort twobytes = 0;
                int elements = 0;
                byte bt = 0;

                try
                {
                    twobytes = binaryReader.ReadUInt16();
                    if (twobytes == 0x8130)
                        binaryReader.ReadByte();
                    else if (twobytes == 0x8230)
                        binaryReader.ReadInt16();
                    else
                        throw new CryptographicException("Wrong data");

                    twobytes = binaryReader.ReadUInt16();
                    if (twobytes != 0x0102)
                        throw new CryptographicException("Wrong data");

                    bt = binaryReader.ReadByte();
                    if (bt != 0x00)
                        throw new CryptographicException("Wrong data");

                    elements = GetIntegerSize(binaryReader);
                    paramModulus = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramE = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramD = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramP = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramQ = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramDP = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramDQ = binaryReader.ReadBytes(elements);

                    elements = GetIntegerSize(binaryReader);
                    paramIQ = binaryReader.ReadBytes(elements);

                    EnsureLength(ref paramD, 256);
                    EnsureLength(ref paramDP, 128);
                    EnsureLength(ref paramDQ, 128);
                    EnsureLength(ref paramE, 3);
                    EnsureLength(ref paramIQ, 128);
                    EnsureLength(ref paramModulus, 256);
                    EnsureLength(ref paramP, 128);
                    EnsureLength(ref paramQ, 128);
                
                    RSAParameters rsaParameters = new RSAParameters();
                    rsaParameters.Modulus = paramModulus;
                    rsaParameters.Exponent = paramE;
                    rsaParameters.D = paramD;
                    rsaParameters.P = paramP;
                    rsaParameters.Q = paramQ;
                    rsaParameters.DP = paramDP;
                    rsaParameters.DQ = paramDQ;
                    rsaParameters.InverseQ = paramIQ;
                  
                    return rsaParameters;
                }
                finally
                {
                    binaryReader.Close();
                }
            }

            private static int GetIntegerSize(BinaryReader binary)
            {
                byte bt = 0;
                byte lowbyte = 0x00;
                byte highbyte = 0x00;
                int count = 0;

                bt = binary.ReadByte();

                if (bt != 0x02)
                    return 0;

                bt = binary.ReadByte();

                if (bt == 0x81)
                    count = binary.ReadByte();
                else if (bt == 0x82)
                {
                    highbyte = binary.ReadByte();
                    lowbyte = binary.ReadByte();
                    byte[] modint = { lowbyte, highbyte, 0x00, 0x00 };
                    count = BitConverter.ToInt32(modint, 0);
                }
                else
                    count = bt;

                while (binary.ReadByte() == 0x00)
                    count -= 1;

                binary.BaseStream.Seek(-1, SeekOrigin.Current);

                return count;
            }

            private static void EnsureLength(ref byte[] data, int desiredLength)
            {
                if (data == null || data.Length >= desiredLength)
                    return;

                int zeros = desiredLength - data.Length;

                byte[] newData = new byte[desiredLength];
                Array.Copy(data, 0, newData, zeros, data.Length);

                data = newData;
            }
        }

        // easy it seems when using BouncyCastle lib 
        /*
        private static RSA LoadClientPrivateKeyFromPemFile(string clientPrivateKeyFileName)
        {
            if (!File.Exists(clientPrivateKeyFileName))
            {
                throw new FileNotFoundException(
                    "The client private key PEM file could not be found",
                    clientPrivateKeyFileName);
            }

            var clientPrivateKeyPemText = File.ReadAllText(clientPrivateKeyFileName);
            using var reader = new StringReader(clientPrivateKeyPemText);

            var pemReader = new PemReader(reader);
            var keyParam = pemReader.ReadObject();

            // GET THE PRIVATE KEY PARAMETERS
            RsaPrivateCrtKeyParameters privateKeyParams = null;

            // This is the case if the PEM file has is a "traditional" RSA PKCS#1 content
            // The private key file with begin and end with -----BEGIN RSA PRIVATE KEY----- and -----END RSA PRIVATE KEY-----
            if (keyParam is AsymmetricCipherKeyPair asymmetricCipherKeyPair)
            {
                privateKeyParams = (RsaPrivateCrtKeyParameters)asymmetricCipherKeyPair.Private;
            }

            // This is to check if it is a Pkcs#8 PRIVATE KEY ONLY or a public key (-----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----)
            if (keyParam is AsymmetricKeyParameter asymmetricKeyParameter)
            {
                privateKeyParams = (RsaPrivateCrtKeyParameters)asymmetricKeyParameter;
            }

            var rsaPrivateKeyParameters = DotNetUtilities.ToRSAParameters(privateKeyParams);

            // CREATE A NEW RSA INSTANCE WITH THE PRIVATE KEY PARAMETERS (THIS IS THE PRIVATE KEY)
            return RSA.Create(rsaPrivateKeyParameters);
        }
        */
        #endregion of ceerconver

        private void button5_Click(object sender, EventArgs e)
        {
            var selFileees = Extaazions.ChoseFiler();
            if (selFileees.Length > 0)
            {
                SUFLER_ASN(exampleOFusingaboveee, selFileees[0]);
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            var selPife = Extaazions.ChoseFiler();
            if (selPife.Length > 0)
            {
                var custopass = string.Copy(textBox3.Text);
                SUFLER_ASN(getSpeciCertificate, selPife[0], custopass);
            }
        }

        private void button7_Click(object sender, EventArgs e)
        {
            // SUFLER_ASN(gaadherAndSaveTxtFields, "load");
            //checkBox1_vrbos.Checked = !checkBox1_vrbos.Checked;
            //  WPA("{0}", IPAddress.Any.ToString());
            SUFLER(someClientTests);
        }

        private void button13_Click(object sender, EventArgs e)
        {
            //var targetDir = Directory.GetParent(Directory.GetCurrentDirectory()) + "\\Dumps";
            //WPA("targ {0} cu:{1}",targetDir, Directory.GetCurrentDirectory());
            // WPA("filee:{0} >> exist:{1}", targetFile, File.Exists(targetFile));
            //  File.WriteAllText(targetFile, "knicemus");
            //  WPA("filee:{0} >> exist:{1}", targetFile, File.Exists(targetFile));

            SUFLER(showMEcharForm, textBox1.Text);
        }

        bool temporialTochen = false;
        public void someClientTests()
        {

            if (temporialTochen)
            {
                temporialTochen = false;
                WPB("GO FALSE");
                return;
            }
            else
                temporialTochen = true;


            var kdyPicovatAbyPrestaly = DateTime.Now.AddMinutes(1.5);

            X509CertificateCollection clicol = null;
            var maybePrasord = textBox5_clientCRTpass.txtBoxSafeReader();

            OpenFileDialog cog = new OpenFileDialog();

            if (cog.ShowDialog() == DialogResult.OK)
            {
                if (cog.FileName != null)
                {
                    if (File.Exists(cog.FileName))
                    {
                        X509Certificate cx509 = null;
                        if (string.IsNullOrEmpty(maybePrasord))
                        {
                            cx509 = X509Certificate.CreateFromCertFile(cog.FileName);
                        }
                        else
                        {
                            cx509 = new X509Certificate(cog.FileName, maybePrasord);
                        }

                        if (cx509 != null)
                            clicol = new X509CertificateCollection(new X509Certificate[] { cx509 });
                    }
                }
            }

            SUFLER_ASN(new Action(() =>
            {

                TcpClient client = new TcpClient("192.168.166.155", 41796);
               
                WPA("after client connect... aviabledata:{0}", client.Available);
                var stream = client.GetStream();
                //Wrap the stream and use "RemoteCertificateValidationCallback" in some way that allows all certificates
                SslStream sslStream = new SslStream(stream, false, new RemoteCertificateValidationCallback(clientSideCertificateValidationCallback));
             
                //Authenticate 
                if (clicol == null)
                    sslStream.AuthenticateAsClient("clientName");
                else
                    sslStream.AuthenticateAsClient("clientName", clicol, false);
                WPA("..after client autd done... aviabledata:{0}, sslprot:{1}", client.Client.Available, sslStream.SslProtocol.ToString());
                //Start sending encrypted messages            
                /*
                string message = "Sending encrypted message";
                while (true)
                {
                    sslStream.Write(Encoding.UTF8.GetBytes(message), 0, message.Length);
                }
                */

                /*
                byte[] loginCipacket = new byte[] { 0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x40, 0xFF, 0xFF, 0xF1, 0x01 };

                sslStream.BeginWrite(loginCipacket, 0, loginCipacket.Length, new AsyncCallback((jasy) =>
                {

                    sslStream.EndWrite(jasy);
                    WPA("loginpack sended...");
                }), sslStream);
                */

                var txtgadr = "";
                List<byte> recibluf = new List<byte>();
                int rebyt = -1;
                do
                {
                    if (recibluf.Count >= 512)
                    {
                        var textrepr = BitConverter.ToString(recibluf.ToArray());
                        WPA("gabed data:{0}", textrepr);
                        recibluf.Clear();
                        txtgadr = "";
                    }

                    rebyt = sslStream.ReadByte();
                    WPA("..after first recived :{0:X2}", rebyt);
                    //...first incoming msg >>  0f 00 01 02
                    if (rebyt > -1)
                    {
                        recibluf.Add((byte)rebyt);
                        txtgadr += (char)rebyt;
                        if (txtgadr.Contains("\x0F\x00\x01\x02"))
                        {
                            txtgadr = "";
                            byte[] loginCipacket = new byte[] { 0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x40, 0xFF, 0xFF, 0xF1, 0x01 };
                            sslStream.BeginWrite(loginCipacket, 0, loginCipacket.Length, new AsyncCallback((jasy) => { sslStream.EndWrite(jasy); WPA("sended login.."); }), sslStream);
                        }
                        else if (txtgadr.Contains("\x0D\x00\x02\x00\x00"))
                        {
                            txtgadr = "";
                            byte[] ackpack = new byte[] { 0x0e, 0x00, 0x02, 0x00, 0x00 };
                            sslStream.Write(ackpack, 0, ackpack.Length);
                        }
                    }

                } while (temporialTochen && rebyt > -1 && DateTime.Now < kdyPicovatAbyPrestaly);

                WPA("..after reading ended...rebyt:{0}, gadrered:{1}", rebyt, recibluf.Count);           
        
                sslStream.Dispose();
                client.Dispose();

            }));
        }
        //Callback function that allows all certificates
        private bool clientSideCertificateValidationCallback(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if (vrbosePrint)
                WPA("..incoming server cert:{0}, chain:{1}", certificate, chain);
            return true;
        }


        private void button8_Click(object sender, EventArgs e)
        {
            //SUFLER_ASN(asyncTestBoxreaderu);
            // var porent = System.IO.Directory.GetParent("/SSL_Server/images");
            //   WPA("porent:{0} {1}, .. {2}",porent.FullName,porent.Name, porent.ToString());

            //  base64Example();
            //var Mi = new MIMEdic();
            //var micombo = Mi.FileTypes.Select(jee => jee.Key +" - "+ jee.Value);
            //WPA(string.Join("\x0D\x0A\x0D", micombo));
            /*if (string.IsNullOrEmpty(textBox5_clientCRTpass.Text))
                textBox5_clientCRTpass.Text = "1";
            var numeroTesto = int.Parse(textBox5_clientCRTpass.Text);
            var jakaazblitaaa = numeroTesto % 10;
            WPA("from:{0} have:{1}",numeroTesto, jakaazblitaaa);
            */

            // like >> 14 00 54 01 7B ...  14 00 [numbytes folow] 01 [{"method....]
            var tobeprepended = textBox2.txtBoxSafeReader();
            var preped = prependCrpcHudr(tobeprepended, "\x01");
            //var buty = Encoding.UTF8.GetBytes(preped);
            var buty = preped.Select(chrb => (byte)chrb).ToArray();

            WPA("{0}\x0D\x0A txtlen:{1}, byteslen:{2}", BitConverter.ToString(buty, 0),preped.Length,  buty.Length);
        }

        void base64Example()
        {

            var bytes = Convert.FromBase64String(textBox1.Text);
            WPB("bytes {0}", BitConverter.ToString(bytes));
            var txtnesmysl = new string(bytes.Select(bb => (char)bb).ToArray());
            WPB("txtlike: {0}", txtnesmysl);

            var aZpetNA64 = Convert.ToBase64String(bytes);
            WPB("zpet na base64 {0}", aZpetNA64);
        }
            

        void asyncTestBoxreaderu()
        {
            var totamje = "" + textBox5_certifPath.txtBoxSafeReader();
            WPA(" ...aand the wizard says:{0}", totamje);

        }

        private void button9_Click(object sender, EventArgs e)
        {



            // var blytes = Encoding.UTF8.GetBytes(hurdled);
            //            var blytes = precomposted.Select(be => (byte)be).ToArray();

            // WPA("\x0D\x0A{0}\r\n{1}", BitConverter.ToString(blytes), blytes.Length);

            //ushort nakolik = 375;
            //var natrans = BitConverter.GetBytes(nakolik);
            //if (BitConverter.IsLittleEndian)
            //   Array.Reverse(natrans);
            //WPA("buflen:{0}, hex:{1}, i0:{2:X2}, i1:{3:X2}, islittleIndian:{4}",natrans.Length, BitConverter.ToString(natrans), natrans[0], natrans[1], BitConverter.IsLittleEndian);
            // with IsLittleEndian == true   it rets 77 01  ...we need 01 77
            /*
                        var textlike = @"    .{""jsonrpc"":""2.0"",""result"":[{""L1"":""..esk.. rozhlas Zl..n"",""L2"":"""",""URL"":""http://static.airable.io/27/42/148816.png"",""URLNAT"":"""",""Id"":""8285154791083188""},{""L1"":""Hitr..dio Zl..n"",""L2"":"""",""URL"":""http://static.airable.io/12/97/499818.png"",""URLNAT"":"""",""Id"":""7771882466971875""},{""L1"":""Radio ..as Rock"",""L2"":"""",""URL"":""http://static.airable.io/35/81/291273.png"",""URLNAT"":"""",""Id"":""3529349114280194""},{""L1"":""Radio ..as"",""L2"":"""",""URL"":""http://static.airable.io/05/98/871266.png"",""URLNAT"":"""",""Id"":""9375304195564241""},{""L1"":""..esk.. rozhlas Ostrava"",""L2"":"""",""URL"":""http://static.airable.io/48/30/909543.png"",""URLNAT"":"""",""Id"":""2597087235189974""},{""L1"":""Fresh radio 103.6 FM"",""L2"":"""",""URL"":""http://static.airable.io/78/47/337711.png"",""URLNAT"":"""",""Id"":""4581997452303767""},{""L1"":""Hitr..dio Orion"",""L2"":"""",""URL"":""http://static.airable.io/40/70/712341.png"",""URLNAT"":"""",""Id"":""2771961932070553""},{""L1"":""R..dio WOW"",""L2"":"""",""URL"":""http://static.airable.io/96/16/622297.png"",""URLNAT"":"""",""Id"":""5686978869140149""},{""L1"":""R..dio Frontinus"",""L2"":"""",""URL"":""http://static.airable.io/76/19/223039.png"",""URLNAT"":"""",""Id"":""5054140804335475""},{""L1"":""R..dio Pie....any"",""L2"":"""",""URL"":""http://static.airable.io/96/44/130275.png"",""URLNAT"":"""",""Id"":""7509315909352154""},{""L1"":""Radio Han.."",""L2"":"""",""URL"":""http://static.airable.io/52/30/754946.png"",""URLNAT"":"""",""Id"":""7737378299701960""},{""L1"":""Radio Vanessa FM"",""L2"":"""",""URL"":""http://static.airable.io/49/68/185125.png"",""URLNAT"":"""",""Id"":""6512174910400063""},{""L1"":""Radio Metropole"",""L2"":"""",""URL"":""http://static.airable.io/24/83/185678.png"",""URLNAT"":"""",""Id"":""2344814836513251""},{""L1"":""Radio Han.. Skyrock"",""L2"":"""",""URL"":""http://static.airable.io/78/94/764913.png"",""URLNAT"":"""",""Id"":""5967036296147854""},{""L1"":""..esk.. rozhlas Olomouc"",""L2"":"""",""URL"":""http://static.airable.io/80/73/770012.png"",""URLNAT"":"""",""Id"":""5846977536100895""},{""L1"":""R..dio Topol..any"",""L2"":"""",""URL"":""http://static.airable.io/98/06/167007.png"",""URLNAT"":"""",""Id"":""3539507842622697""},{""L1"":""BETA"",""L2"":"""",""URL"":""http://static.airable.io/50/89/708491.png"",""URLNAT"":"""",""Id"":""2012331132311374""},{""L1"":""Z..hor..cke R..dio"",""L2"":"""",""URL"":""http://static.airable.io/59/78/810184.png"",""URLNAT"":"""",""Id"":""5773121670354158""},{""L1"":""Radio 90 FM"",""L2"":"""",""URL"":""http://static.airable.io/75/31/550321.png"",""URLNAT"":"""",""Id"":""3029984278604388""},{""L1"":""R..dio Rebeca"",""L2"":"""",""URL"":""http://static.airable.io/18/05/655621.png"",""URLNAT"":"""",""Id"":""9537330159917475""},{""L1"":""Radio Kaj"",""L2"":"""",""URL"":""http://static.airable.io/80/41/547491.png"",""URLNAT"":"""",""Id"":""1442473493516445""},{""L1"":""R..dio Jih"",""L2"":"""",""URL"":""http://static.airable.io/29/03/995223.png"",""URLNAT"":"""",""Id"":""3810104942414910""},{""L1"":""Radio Bielsko"",""L2"":"""",""URL"":""http://static.airable.io/42/96/473006.png"",""URLNAT"":"""",""Id"":""3240685149095952""},{""L1"":""Meloradio Bielsko-Bia..a"",""L2"":"""",""URL"":""http://static.airable.io/32/84/808829.png"",""URLNAT"":"""",""Id"":""3126266425009817""},{""L1"":""Radio Anio.. Beskid..w"",""L2"":"""",""URL"":""http://static.airable.io/09/79/142957.png"",""URLNAT"":"""",""Id"":""6350632569286973""},{""L1"":""Disco Radio"",""L2"":"""",""URL"":""http://static.airable.io/19/92/960410.png"",""URLNAT"":"""",""Id"":""7706978951580823""},{""L1"":""Mega Radio"",""L2"":"""",""URL"":""http://static.airable.io/16/88/358901.png"",""URLNAT"":"""",""Id"":""8558986073359848""},{""L1"":""RadioCCM (Live365)"",""L2"":"""",""URL"":""http://static.airable.io/57/32/811663.png"",""URLNAT"":"""",""Id"":""6944916712585837""},{""L1"":""R..dio Roma"",""L2"":"""",""URL"":""http://static.airable.io/41/37/977972.png"",""URLNAT"":"""",""Id"":""1429354285355657""},{""L1"":""BB FM r..dio"",""L2"":"""",""URL"":""http://static.airable.io/79/31/648088.png"",""URLNAT"":"""",""Id"":""4899571284651756""},{""L1"":""R..dio Lumen"",""L2"":"""",""URL"":""http://static.airable.io/28/28/953429.png"",""URLNAT"":"""",""Id"":""6521094692870975""},{""L1"":""R..dio Regina Bansk.. Bystrica"",""L2"":"""",""URL"":""http://static.airable.io/98/85/862263.png"",""URLNAT"":"""",""Id"":""6698371940758080""},{""L1"":""Radio Opole 96.3 FM"",""L2"":"""",""URL"":""http://static.airable.io/11/73/108584.png"",""URLNAT"":"""",""Id"":""7949754130095244""},{""L1"":""Radio Doxa"",""L2"":"""",""URL"":""http://static.airable.io/41/22/859344.png"",""URLNAT"":"""",""Id"":""3459143014159054""},{""L1"":""Radio Katowice"",""L2"":"""",""URL"":""http://static.airable.io/91/66/310154.png"",""URLNAT"":"""",""Id"":""6449534035287798""},{""L1"":""Radio IMPERIUM"",""L2"":"""",""URL"":""http://static.airable.io/54/38/629105.png"",""URLNAT"":"""",""Id"":""7662306622136385""},{""L1"":""Hitr..dio City (Brno)"",""L2"":"""",""URL"":""http://static.airable.io/40/88/877441.png"",""URLNAT"":"""",""Id"":""3214222684502601""},{""L1"":""R..dio Krokod..l"",""L2"":"""",""URL"":""http://static.airable.io/81/09/443564.png"",""URLNAT"":"""",""Id"":""6380595312453807""},{""L1"":""R..dio 7"",""L2"":"""",""URL"":""http://static.airable.io/40/02/397744.png"",""URLNAT"":"""",""Id"":""5652439552359283""},{""L1"":""R..dio Expres"",""L2"":"""",""URL"":""http://static.airable.io/63/54/834633.png"",""URLNAT"":"""",""Id"":""8022025032434613""},{""L1"":""R..dio Melody"",""L2"":"""",""URL"":""http://static.airable.io/02/10/644907.png"",""URLNAT"":"""",""Id"":""7726563234813512""},{""L1"":""Best FM"",""L2"":"""",""URL"":""http://static.airable.io/37/63/166797.png"",""URLNAT"":"""",""Id"":""4284708789549768""},{""L1"":""Europa 2"",""L2"":"""",""URL"":""http://static.airable.io/51/06/167591.png"",""URLNAT"":"""",""Id"":""1806186840403825""},{""L1"":""R..dio FM"",""L2"":"""",""URL"":""http://static.airable.io/02/59/798482.png"",""URLNAT"":"""",""Id"":""9072183442302049""},{""L1"":""R..dio Dev..n"",""L2"":"""",""URL"":""http://static.airable.io/95/20/667873.png"",""URLNAT"":"""",""Id"":""2304640693124383""},{""L1"":""R..dio Slovensko"",""L2"":"""",""URL"":""http://static.airable.io/58/36/862550.png"",""URLNAT"":"""",""Id"":""8547637441661210""},{""L1"":""Fun R..dio"",""L2"":"""",""URL"":""http://static.airable.io/84/81/109540.png"",""URLNAT"":"""",""Id"":""2437183656729758""},{""L1"":""Kiss Radio"",""L2"":"""",""URL"":""http://static.airable.io/68/20/432296.png"",""URLNAT"":"""",""Id"":""5522407412994653""},{""L1"":""RMF FM"",""L2"":"""",""URL"":""http://static.airable.io/00/84/982277.png"",""URLNAT"":"""",""Id"":""9636442124843598""},{""L1"":""Radio Krak..w"",""L2"":"""",""URL"":""http://static.airable.io/14/33/503890.png"",""URLNAT"":"""",""Id"":""2516586087644100""},{""L1"":""Hitr..dio ..ern.. Hora"",""L2"":"""",""URL"":""http://static.airable.io/30/26/315303.png"",""URLNAT"":"""",""Id"":""8418970567639918""},{""L1"":""Dobr.. r..dio"",""L2"":"""",""URL"":""http://static.airable.io/67/34/311405.png"",""URLNAT"":"""",""Id"":""4623605915345252""},{""L1"":""Radio Prostor"",""L2"":"""",""URL"":""http://static.airable.io/67/75/356821.png"",""URLNAT"":"""",""Id"":""9076463279780001""},{""L1"":""Frekvence 1"",""L2"":"""",""URL"":""http://static.airable.io/14/43/895138.png"",""URLNAT"":"""",""Id"":""8663883324246854""},{""L1"":""..esk.. rozhlas Vltava"",""L2"":"""",""URL"":""http://static.airable.io/01/59/399569.png"",""URLNAT"":"""",""Id"":""3727490088436753""},{""L1"":""R..dio BLAN..K"",""L2"":"""",""URL"":""http://static.airable.io/89/26/659910.png"",""URLNAT"":"""",""Id"":""1865371257532388""},{""L1"":""Expres FM"",""L2"":"""",""URL"":""http://static.airable.io/47/55/266069.png"",""URLNAT"":"""",""Id"":""9913098774850369""},{""L1"":""Radio Maryja"",""L2"":"""",""URL"":""http://static.airable.io/15/51/962785.png"",""URLNAT"":"""",""Id"":""4958616537041962""}],""error"":null,""id"":69823}";

                        var multiJasnii = walkAndCompartmelize(textlike);
                        WPA("multiJasnii len:{0}", multiJasnii.Length);
                        foreach (var onoejasnej in multiJasnii)
                        {
                            WPA("onejasen >>> {0}", onoejasnej);
                        }
                        */
  
            var bubyt = new byte[] { 0x1B, 0x2E };
            var usnomero = BitConverter.ToUInt16(bubyt, 0);
            WPA("{0}", usnomero);
        }

        string[] walkAndCompartmelize(string multiJasans)
        {
            if(string.IsNullOrEmpty(multiJasans))return new string[0]; 

            List<string> dethwhishes = new List<string>();

            var insurunc = 696;
            do
            {
                var indexofFirstEnd = multiJasans.IndexOf("},{");
                if (indexofFirstEnd > -1)
                {
                    var firstPacket = multiJasans.Substring(0, 1 + indexofFirstEnd);
                    dethwhishes.Add(firstPacket);
                    var restOfit = multiJasans.Substring(2 + indexofFirstEnd);
                    multiJasans = string.Copy(restOfit);
                  //  WPA("first>> {0}", firstPacket);
                  //  WPA("restofit>> {0}", restOfit);
                }
                else
                {
                    dethwhishes.Add(multiJasans);
                    break;
                }

            } while (--insurunc > 0 && multiJasans.Length > 0 && multiJasans.Contains("},{"));

            return dethwhishes.ToArray();
        }

        private void textBox4_DoubleClick(object sender, EventArgs e)
        {
            OpenFileDialog opog = new OpenFileDialog();
            var opatrnacestovanaa = textBox4.Text;
            if (File.Exists(opatrnacestovanaa))
                opog.InitialDirectory = Path.GetDirectoryName(opatrnacestovanaa);
            else
                opog.InitialDirectory = textBox4.Text;
            //opog.FileName = "index.html";
            if (opog.ShowDialog() == DialogResult.OK)
            {
                wwwDefaultIndexFile = Path.GetFileName(opog.FileName);
                wwwPath = Path.GetDirectoryName(opog.FileName);
                //       WPB("index file:{0}", wwwDefaultIndexFile);
                textBox4.Text = opog.FileName; //  wwwPath;
            }
        }

        // www server root dir ..when trigeered by load cfg from file..
        private void textBox4_TextChanged(object sender, EventArgs e)
        {
            var freshvaala = textBox4.Text;
            if (!string.IsNullOrEmpty(freshvaala))
            {
                if (File.Exists(freshvaala))
                {
                    wwwDefaultIndexFile = Path.GetFileName(freshvaala);
                    wwwPath = Path.GetDirectoryName(freshvaala);
                }
                else
                {
                   // wwwPath = freshvaala;
                    wwwPath = rootPathUrl + "\\www";
                    wwwDefaultIndexFile = "index.html";

                }
            }
          //  WPB("txt changed:{0}", e.ToString());
        }


        public static bool vrbosePrint
        {
            get;
            set;
        }

        private void checkBox1_vrbos_CheckStateChanged(object sender, EventArgs e)
        {
            //WPA("..justt changed state {0}", e.ToString());
            if (vrbosePrint != checkBox1_vrbos.Checked)
                vrbosePrint = checkBox1_vrbos.Checked;
        }

        private void button10_Click(object sender, EventArgs e)
        {
            // load what curently in textbox,,.. if nonexistant then ask for selection..
            if (!string.IsNullOrEmpty(textBox5_certifPath.Text))
            {
                var prefiledCertPatutha = string.Copy(textBox5_certifPath.Text);
                if (File.Exists(prefiledCertPatutha))
                {                   
                    selectCustomCert(prefiledCertPatutha);
                    return;
                }
            }

            textBox5_certifPath_DoubleClick(textBox5_certifPath, e);
        }

        private void textBox5_certifPath_DoubleClick(object sender, EventArgs e)
        {
            var previousOrInitialDirFilPatha = Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\seru_cubu.pfx";
            if (sender is TextBoxBase)
            {
                var curentlyinBox = ((TextBoxBase)sender).Text;
                if (!string.IsNullOrEmpty(curentlyinBox))
                {
                    if (Directory.Exists(Path.GetDirectoryName(curentlyinBox)))
                        previousOrInitialDirFilPatha = curentlyinBox;
                }
            }

            OpenFileDialog opog = new OpenFileDialog();
            opog.InitialDirectory = Path.GetDirectoryName(previousOrInitialDirFilPatha);
            if (opog.ShowDialog() == DialogResult.OK)
            {
                if (!string.IsNullOrEmpty(opog.FileName))
                {
                    previousOrInitialDirFilPatha = opog.FileName;
                    textBox5_certifPath.Text = previousOrInitialDirFilPatha;
                }
            }

            if (!File.Exists(previousOrInitialDirFilPatha))
            {
                WPA("selected file does not exist:{0}", previousOrInitialDirFilPatha);
                return;
            }

            selectCustomCert(previousOrInitialDirFilPatha);
        }

        /// <summary>
        /// ASYNC .. automaticaly load pass from textfield..
        /// </summary>
        /// <param name="optionalPreviousPath"></param>
        void selectCustomCert(string optionalPreviousPath)
        {
            var custoCertPasss = string.Empty;
            if (string.IsNullOrEmpty(optionalPreviousPath))
                optionalPreviousPath = Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\seru_cubu.pfx";

            //  if (textBox3.Text != null && textBox3.Text.Length > 0)
            //    custoCertPasss = textBox3.Text;
            custoCertPasss = textBox3.txtBoxSafeReader();

            if (string.IsNullOrEmpty(custoCertPasss))
                custoCertPasss = "crestron";

            SUFLER_ASN(getSpeciCertificate, optionalPreviousPath, custoCertPasss);
        }


        #region exercise in saving desired params of the form
        /// <summary>
        /// those wont be rewrited during load ..eg to actualy keep some log window as undisturbed log
        /// </summary>
        private string[] excludedControlrsFromLoad = new string[] 
        {
            "textBox2",
            "ExtraAditionalHeadrs"
        };

        public void gaadherAndSaveTxtFields(string paramSaveOrLoad)
        {
            if (string.IsNullOrEmpty(paramSaveOrLoad))
                paramSaveOrLoad = "save";

            var mainForm = Form1.meForm1;
            if (mainForm != null)
            {
             
                if (mainForm.IsDisposed) //!mainForm.IsAccessible)
                    return;

                List<Control> gadhered = new List<Control>();

                var hisControls = mainForm.Controls.Cast<Control>();
                if (hisControls.Any())
                {
                    foreach (var whoknowsHo in hisControls)
                    {
                        reciprocalControlsGadher(whoknowsHo, ref gadhered);
                    }
                }

                if (gadhered.Count > 0)
                {
                    //   WPB("gadhered amount:{0}", gadhered.Count);

                    JsonSerializerSettings poserSetungs = new JsonSerializerSettings();
                    poserSetungs.NullValueHandling = NullValueHandling.Include;
                    poserSetungs.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    poserSetungs.Formatting = Formatting.Indented;
                    poserSetungs.Error = new EventHandler<Newtonsoft.Json.Serialization.ErrorEventArgs>((who, jer) =>
                    {
                        jer.ErrorContext.Handled = true;
                    });

                    if (paramSaveOrLoad.IndexOf("save", StringComparison.CurrentCultureIgnoreCase) > -1)
                    {
                        Dictionary<string, object> tmpData = new Dictionary<string, object>();

                        foreach (var somefidar in gadhered)
                        {
                            var cntrlname = somefidar.Name;
                            if (somefidar is TextBoxBase)
                            {
                                var jehoVlhkota = ((TextBoxBase)somefidar).txtBoxSafeReader();
                                tmpData.ADuD(cntrlname, jehoVlhkota);
                            }
                            else if (somefidar is CheckBox)
                            {
                                //...atd ..if required
                                var jehoVlhkota = ((CheckBox)somefidar).Checked;
                                tmpData.ADuD(cntrlname, jehoVlhkota);
                            }
                            else
                            {
                                //...atd
                            }
                        }

                        // extra special field to it...
                        if (ExtraAditionalHeadrs.Count > 0)
                        {
                            var boxedVal = ExtraAditionalHeadrs.ToArray();
                            tmpData.ADuD("ExtraAditionalHeadrs", boxedVal);
                        }

                        var seredData = Newtonsoft.Json.JsonConvert.SerializeObject(tmpData, Formatting.Indented, poserSetungs);
                        if (!string.IsNullOrEmpty(seredData))
                        {
                            File.WriteAllText(saveFile, seredData, Encoding.UTF8);
                            //if (Form1.vrbosePrint)
                                WPB("config saved ok to:{0}", saveFile);
                           // else
                             //   WPB("config Save OK ! ");
                        }

                    }
                    else
                    {
                        // load then
                        if (!File.Exists(saveFile))
                        {
                            // because i am tired of moving around the save file when moving between workplaces..
                            var possibleUpperPlebec = string.Empty;
                            if (Extaazions.ClaimUPandSearchForFile(saveFile, 33, ref possibleUpperPlebec))
                            {
                                this.saveFile = possibleUpperPlebec;
                            }
                        }

                        if (File.Exists(saveFile))
                        {
                            var fileeCuntent = File.ReadAllText(saveFile, Encoding.UTF8);
                            if (!string.IsNullOrEmpty(fileeCuntent))
                            {
                                var deserDyk = JsonConvert.DeserializeObject(fileeCuntent, typeof(Dictionary<string, object>), poserSetungs);
                                if (deserDyk != null)
                                {
                                    Dictionary<string, object> DetmpData = (Dictionary<string, object>)deserDyk;

                                    var kukeje = DetmpData.Keys.ToArray();
                                    foreach (var oneControlNAme in kukeje)
                                    {
                                        if (!excludedControlrsFromLoad.Contains(oneControlNAme))
                                        {
                                            var indexPreGadherListu = gadhered.FindIndex(tohoco => tohoco.Name.Equals(oneControlNAme));
                                            if (indexPreGadherListu > -1)
                                            {
                                                Control targetTobeUpdated = gadhered[indexPreGadherListu];
                                                if (!targetTobeUpdated.IsDisposed)
                                                {
                                                    var savedVaal = DetmpData[oneControlNAme];
                                                    if (savedVaal == null)
                                                        savedVaal = "";
                                                    if (targetTobeUpdated is TextBoxBase)
                                                    {
                                                        var tenbox = ((TextBoxBase)targetTobeUpdated);
                                                        tenbox.txtBoxSafeWriter(savedVaal.ToString());
                                                    }
                                                    else if (targetTobeUpdated is CheckBox)
                                                    {
                                                        bool resultiingVaal = false;
                                                        if (savedVaal is Boolean)
                                                            resultiingVaal = (Boolean)savedVaal;

                                                        if (targetTobeUpdated.InvokeRequired)
                                                        {
                                                            targetTobeUpdated.Invoke(new Action<bool>(toputThere =>
                                                            {
                                                                ((CheckBox)targetTobeUpdated).Checked = resultiingVaal;
                                                            }), new object[] { resultiingVaal });
                                                        }
                                                        else
                                                        {
                                                            ((CheckBox)targetTobeUpdated).Checked = resultiingVaal;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        // atd...
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            // then some extra posering to load to fieldds...
                                            // special...
                                            if (oneControlNAme.Equals("ExtraAditionalHeadrs"))
                                            {
                                                //  expecting arr withh eexttra hhaders..
                                                var extraDaraj = DetmpData[oneControlNAme];
                                                if (extraDaraj != null)
                                                {
                                                    var forSurRaj = JArray.FromObject(extraDaraj);

                                                    if (forSurRaj != null && forSurRaj.Count > 0)
                                                    {
                                                        foreach (var oneeeRowaj in forSurRaj)
                                                        {
                                                            var txtnaa = oneeeRowaj.ToString();
                                                            if (!string.IsNullOrEmpty(txtnaa))
                                                            {
                                                                if (ExtraAditionalHeadrs.Contains(txtnaa))
                                                                {
                                                                    ExtraAditionalHeadrs.Remove(txtnaa);        // may check if sucefull...but fuck it for now
                                                                }

                                                                ExtraAditionalHeadrs.Add(txtnaa);
                                                            }
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }   // end of save load fuchtle ..aka extenzive training..

        void reciprocalControlsGadher(Control oneLudrol, ref List<Control> gadhered)
        {
            if (oneLudrol == null) return;
            var subLudry = oneLudrol.Controls;
            if (subLudry != null && subLudry.Count > 0)
            {
                foreach (Control lol in subLudry)
                {
                    reciprocalControlsGadher(lol, ref gadhered);
                }
            }
            else
            {
                if (oneLudrol is TextBoxBase)
                {
                    //   TextBoxBase txtbas = (TextBoxBase)oneLudrol;
                    gadhered.Add(oneLudrol);
                }
                else if (oneLudrol is CheckBox)
                {
                    gadhered.Add(oneLudrol);
                }
            }
        }



        #endregion exercise in saving desired params of the form...end

        private void button11_SaveSFG_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(gaadherAndSaveTxtFields, "save");
        }

        private void button12_LoadCFG_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(gaadherAndSaveTxtFields, "load");
        }

        private void button11_Click(object sender, EventArgs e)
        {
            offerExtensiveWoknoWithHeadrs();
        }

        void offerExtensiveWoknoWithHeadrs()
        {
            var curentlyAviablleForms = Application.OpenForms.OfType<Form>().ToList();
            var maybeKundaPredeslaa = curentlyAviablleForms.FindIndex(jenz => jenz != null && jenz.Name.Equals("Form2"));
            if (maybeKundaPredeslaa > -1)
            {
                var someHhalfCorpse = curentlyAviablleForms[maybeKundaPredeslaa];
                /* some re-petition how it is ..
                WPB("predesly form zbytek: IsHandleCreated:{0}, IsAccessible:{1}, IsDisposed:{2}",
                    someHhalfCorpse.IsHandleCreated,
                    someHhalfCorpse.IsAccessible, 
                    someHhalfCorpse.IsDisposed);
                */
                if (!someHhalfCorpse.IsDisposed)
                    curentlyAviablleForms[maybeKundaPredeslaa].Dispose();
                else
                    curentlyAviablleForms[maybeKundaPredeslaa].Close();
            }

            var byformar = new Form2();
            //byformar.textBox1_headrs.Text 
            byformar.Show(Form1.meForm1);
        }

        private void textBox5_ip_TextChanged(object sender, EventArgs e)
        {
            // ip adres box 
            if (string.IsNullOrEmpty(textBox5_ip.Text))
            {
                var posibleIPa = textBox5_ip.Text.Trim();
                custIPlistAdres = string.Copy(posibleIPa);
            }
        }

        private void textBox5_port_TextChanged(object sender, EventArgs e)
        {
            // port box
            if (string.IsNullOrEmpty(textBox5_port.Text))
            {
                var jakyportTedy = string.Copy(textBox5_port.Text);
                if (!int.TryParse(jakyportTedy, out cuustPortLisen))                
                {
                    cuustPortLisen = 9999;                   
                }
                var zpetnattext = cuustPortLisen.ToString();
                // avoid looping trigering of this very event..
                if (textBox5_port.Text != zpetnattext)
                    textBox5_port.Text = zpetnattext;
            }
        }

        private void checkBox1_useSSL_CheckStateChanged(object sender, EventArgs e)
        {
            SecureUse = checkBox1_useSSL.Checked;
        }

        private void checkBox_allowDirBrowse_CheckStateChanged(object sender, EventArgs e)
        {
            AllowDirBrowse = checkBox_allowDirBrowse.Checked;
        }

        private void textBox5_clientCert_DoubleClick(object sender, EventArgs e)
        {
            OpenFileDialog clog = new OpenFileDialog();
            if (clog.ShowDialog() == DialogResult.OK)
            {
                if (clog.FileName != null)
                {
                    textBox5_clientCert.Text = clog.FileName;
                    var posiblepass = textBox5_clientCRTpass.txtBoxSafeReader();
                    
                    SUFLER_ASN(LoadPrepClientCert, clog.FileName, posiblepass);
                }
            }
        }

        void LoadPrepClientCert(string selectedFile,string optionalpass)
        {
            if (string.IsNullOrEmpty(selectedFile)) return;
            if (File.Exists(selectedFile))
            {
                WPA("preparing Client cert:{0}", Path.GetFileName(selectedFile));

                X509Certificate tmpc = null;
                try
                {
                    if (string.IsNullOrEmpty(optionalpass))
                        tmpc = new X509Certificate(selectedFile);
                    else
                        tmpc = new X509Certificate(selectedFile, optionalpass);
                }
                catch (Exception cerlor)
                {
                    WPA("Client cert iFilename load err:{0}", cerlor.Message);
                    return;
                }

                if (tmpc != null)
                {
                    WPA("client CertHave:{0} {1}", tmpc.ToString(), string.IsNullOrEmpty(optionalpass) ? "" : "withPass:" + optionalpass);
                    sslClientCertifikat = tmpc;
                }
            }
        }

        private void button12_bridgeGo_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(StartTCPbridge);
        }

        private void button12_bridgeSTOP_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(STopTCPbridge);
        }


        public void STopTCPbridge()
        {
            keepBridgeListenerThreadAlive = false;

            if (tcpBridgeListener != null)
            {
                try
                {
                    tcpBridgeListener.Stop();
                }
                catch (Exception ex) { WPB("on tcp bridge stop err:{0}", ex.Message); }
            }
        }

        Action<TcpClient,Object[]> asyPrepBridgeFromClient = null;
        public void StartTCPbridge()
        {
            if (tcpBridgeListener != null)
            {
                STopTCPbridge();
            }
            
             // now params from form gadhering...
             tcpBridgeListenAdres = textBox6_bridge_listenIP.txtBoxSafeReader();
            tcpBridgeConnectAdres = textBox6_bridge_connIP.txtBoxSafeReader();

            IPAddress bridgeListenAdres = IPAddress.Any;

            if (!IPAddress.TryParse(tcpBridgeListenAdres, out bridgeListenAdres))
                bridgeListenAdres = IPAddress.Any;

            tcpBridgePortListen = 41794;
            var txtListenPort = textBox5_bridge_listenPort.txtBoxSafeReader();
            if (!string.IsNullOrEmpty(txtListenPort))
            {
                if (!int.TryParse(txtListenPort, out tcpBridgePortListen))
                    tcpBridgePortListen = 41794;
            }

            tcpBridgeConnectPort = 41796;
            var txtConnectPort = textBox5_bridge_conPort.txtBoxSafeReader();
            if (!string.IsNullOrEmpty(txtConnectPort))
            {
                if (!int.TryParse(txtConnectPort, out tcpBridgeConnectPort))
                    tcpBridgeConnectPort = 41796;
            }


            if (sslClientCertifikat == null)
            {
                var maybeClientCertFile = textBox5_clientCert.txtBoxSafeReader();
                var maybeClientCertPass = textBox5_clientCRTpass.txtBoxSafeReader();
                if (!string.IsNullOrEmpty(maybeClientCertFile))
                {
                    SUFLER(LoadPrepClientCert, maybeClientCertFile, maybeClientCertPass);
                }
            }

            if (asyPrepBridgeFromClient == null)
               // asyPrepBridgeFromClient = new Action<TcpClient, Object[]>(bridge_takeIncomomgCliAndProcess);
             asyPrepBridgeFromClient = new Action<TcpClient, Object[]>(bridge_takeIncomingClientAndBridgeITto);

            keepBridgeListenerThreadAlive = true;
            bridgeReconectAtempt = 6;

            bridgeListThread = new Thread(() =>
            {

                tcpBridgeListener = new TcpListener(bridgeListenAdres, tcpBridgePortListen);

                Object[] baglData = null;

                try
                {
                    tcpBridgeListener.Start();
                }
                catch (SocketException staaEr)
                {
                    WPA("tcpBridgeListener SocketException during listener start:{0}", staaEr.Message);
                    return;
                }
                catch (Exception Er)
                {
                    WPA("tcpBridgeListener err duringlistener start:{0}", Er.Message);
                    return;
                }

                WPB("tcp tcpBridgeListener  STARTED on:{0}", tcpBridgeListener.LocalEndpoint.ToString());
                WPB("may try cip connto :\x0D\x0A {0}:{1}, bridged to:{2}:{3}",
                    (bridgeListenAdres.ToString() == "0.0.0.0" ? "127.0.0.1" : bridgeListenAdres.ToString()),
                    tcpBridgePortListen,
                    tcpBridgeConnectAdres,
                    tcpBridgeConnectPort);

                while (true && keepBridgeListenerThreadAlive)
                {

                    // purposly have it in loop, so if change in these global vars ..it should reflect..
                    baglData = new object[] { tcpBridgeConnectAdres, tcpBridgeConnectPort, null, null, null, null, null, (int)1, (int)1, null };

                    try
                    {
                        TcpClient client = tcpBridgeListener.AcceptTcpClient();
                        if (client != null)
                            asyPrepBridgeFromClient.BeginInvoke(client, baglData, null, client);
         

                    }
                    catch (Exception ex) { WPB("bridge AcceptTcpClient err:{0}", ex.Message); }

                }
            });

            bridgeListThread.Start();

        }

        /// <summary>
        /// this one works...but its crude, althou direct..
        /// </summary>
        /// <param name="incomingTcpClient"></param>
        /// <param name="baglData"></param>
        void bridge_takeIncomomgCliAndProcess (TcpClient incomingTcpClient, Object[] baglData)
        {
            if (!keepBridgeListenerThreadAlive) return;

            var txtIPtoCon = "192.168.166.54";
            var numPortToCon = 41796;
            IPAddress bridgeConnectAdres = IPAddress.Any;
            if (baglData != null && baglData.Length > 1)
            {
                txtIPtoCon = (string)baglData[0];
                numPortToCon = (int)baglData[1];

                if (!IPAddress.TryParse(txtIPtoCon, out bridgeConnectAdres))
                    bridgeConnectAdres = IPAddress.Any;
            }

            baglData[2] = incomingTcpClient;

            TcpClient clientCon = new TcpClient();

            try
            {
                clientCon.Connect(bridgeConnectAdres, numPortToCon);
            }
            catch (Exception cnr)
            {
                WPB("fail during connect atempt to:{0}:{1}, err:{2}", bridgeConnectAdres, numPortToCon, cnr.Message);
                if (--bridgeReconectAtempt > 0 && keepBridgeListenerThreadAlive && incomingTcpClient.Connected)
                {
                    asyPrepBridgeFromClient.BeginInvoke(incomingTcpClient, baglData, null, incomingTcpClient);
                    return;
                }
            }

            WPB("after bridge client connect..to:{0}:{1}, status:{2}", bridgeConnectAdres, numPortToCon, clientCon.Connected);

            if (!clientCon.Connected)
            {
                if (--bridgeReconectAtempt > 0 && keepBridgeListenerThreadAlive && incomingTcpClient.Connected)
                {
                    WPB("bridging client failed to connect, ..atempting again to:{0}:{1}", bridgeConnectAdres, numPortToCon);
                    asyPrepBridgeFromClient.BeginInvoke(incomingTcpClient, baglData, null, incomingTcpClient);
                    return;
                }
                else
                {
                    WPB("bridging client failed to connect to:{0}:{1} !! and atempts delepted... stopping whole endeavor..", bridgeConnectAdres, numPortToCon);
                    STopTCPbridge();
                    return;
                }
            }


            WPB("..BOTH sides of bridge connected:{0} ...preparing streams !!", (clientCon.Connected && incomingTcpClient.Connected));
            // the comunication should start CP,  with "0f 00 01 02" ...so the first data should come from secured client ...


            var conClientNetStream = clientCon.GetStream();
            System.Net.Security.SslStream conClsslStream = new SslStream(conClientNetStream, false, new RemoteCertificateValidationCallback(bridgeConClientSRVsCertValidationKalba));

            try
            {
                if (sslClientCertifikat == null)
                    conClsslStream.AuthenticateAsClient("bridgeCip");
                else
                {
                    X509CertificateCollection clientCrtss = new X509CertificateCollection();
                    clientCrtss.Add(sslClientCertifikat);
                    conClsslStream.AuthenticateAsClient("bridgeCip", clientCrtss, false);
                }
            }
            catch (System.Security.Authentication.AuthenticationException authrr)
            {
                //     The authentication failed and left this object in an unusable state.
                WPB("bridge client AuthenticateAsClient AuthenticationException:{0}", authrr.Message);
                STopTCPbridge();
                return;
            }
            catch (System.InvalidOperationException ynr)
            {
                //     Authentication has already occurred. -or- Server authentication using this System.Net.Security.SslStream
                //     was tried previously. -or- Authentication is already in progress.
                WPB("bridge client AuthenticateAsClient InvalidOperationException:{0}", ynr.Message);
                STopTCPbridge();
                return;
            }
            catch (Exception aur)
            {
                WPB("bridge client AuthenticateAsClient fuckERR:{0}", aur.Message);
                STopTCPbridge();
                return;
            }

           // baglData[2] = incomingTcpClient;
            baglData[4] = clientCon;
            baglData[5] = conClsslStream;

            NetworkStream onistrim = incomingTcpClient.GetStream();

         //   ulong fromCPtoXpanCounter = 0;
          //  ulong fromXPANtoCPcounter = 0;

            bool sLezbou = true;

            //  var throudad = new Thread(()  SUFLER_ASN(new Action(()

            SUFLER_ASN(new Action(() =>
            {
                // var txtgadr = "";
                // List<byte> recibluf = new List<byte>();
                int rebyt = -1;
                do
                {
                    try
                    {
                        rebyt = conClsslStream.ReadByte();
                        //  WPA("SSL..after first recived :{0:X2}", rebyt);
                        //...first incoming msg >>  0f 00 01 02

                        if (sLezbou && rebyt > -1)
                        {
                            // recibluf.Add((byte)rebyt);
                            // txtgadr += (char)rebyt;
                            onistrim.WriteByte((byte)rebyt);
                            //  fromCPtoXpanCounter++;                 
                        }

                    }
                    catch (ObjectDisposedException odiir)
                    {
                        WPA("ObjectDisposedException:{0}  err:{1}", odiir.ObjectName, odiir.Message);
                        break;
                    }
                    catch (Exception rer)
                    {
                        WPA("readin conClsslStream err:{0}", rer.Message);
                        break;
                    }

                } while (sLezbou && keepBridgeListenerThreadAlive && rebyt > -1);


                if (keepBridgeListenerThreadAlive)
                {
                    sLezbou = false;
                    WPB("conSSL ..somehow ended after reading loop....");
                    //  WPB("conSSL ..somehow ended after reading loop... hevyBytesCounter:{0}", fromCPtoXpanCounter);
                    // means we ar disconected from the CP ...
                    // clientCon.Dispose();

                    if (incomingTcpClient.Connected)
                        incomingTcpClient.Close();

                }

            }));
          
         //   throudad.Start();


            SUFLER_ASN(new Action(() =>
            {
                // var txtgadr = "";
                // List<byte> recibluf = new List<byte>();
                int irebyt = -1;
                do
                {
                    try
                    {
                        irebyt = onistrim.ReadByte();
                        //  WPA("XPAN..after first recived :{0:X2}", irebyt);
                        //...first incoming msg >>  0f 00 01 02

                        if (sLezbou && irebyt > -1)
                        {
                            // recibluf.Add((byte)rebyt);
                            // txtgadr += (char)rebyt;
                            conClsslStream.WriteByte((byte)irebyt);
                            //  fromXPANtoCPcounter++;
                        }
                    }
                    catch (ObjectDisposedException odiir)
                    {
                        WPA("ObjectDisposedException:{0}  err:{1}", odiir.ObjectName, odiir.Message);
                        break;
                    }
                    catch (Exception rer)
                    {
                        WPA("readin xpanel err:{0}", rer.Message);
                        break;
                    }



                } while (sLezbou && keepBridgeListenerThreadAlive && irebyt > -1);

                if (keepBridgeListenerThreadAlive)
                {
                    sLezbou = false;
                    //WPB("xpanel con ..somehow ended after reading loop... hevyBytesCounter:{0}", fromXPANtoCPcounter);
                    WPB("xpanel con ..somehow ended after reading loop... ");
                    // ..eg it means Xpanel disconected...so tak care of remaining half of pair...let new one be invoked if any,..

                 //   if (incomingTcpClient.Connected)
                  //      incomingTcpClient.Close();
                    if (clientCon.Connected)
                        clientCon.Close();

                }

            }));

        }

        private int bridgeReconectAtempt = 6;
        /// <summary>
        /// this branch it not working properly 
        /// </summary>
        /// <param name="incomingTcpClient"></param>
        /// <param name="baglData"></param>
        void bridge_takeIncomingClientAndBridgeITto(TcpClient incomingTcpClient, Object[] baglData)
        {
            if (!keepBridgeListenerThreadAlive) return;

            var txtIPtoCon = "192.168.166.54";
            var numPortToCon = 41796;
            IPAddress bridgeConnectAdres = IPAddress.Any;
            if (baglData != null && baglData.Length > 1)
            {
                txtIPtoCon = (string)baglData[0];
                numPortToCon = (int)baglData[1];

                if (!IPAddress.TryParse(txtIPtoCon, out bridgeConnectAdres))
                    bridgeConnectAdres = IPAddress.Any;
            }

            baglData[2] = incomingTcpClient;

            TcpClient clientCon = new TcpClient();

            try
            {
                clientCon.Connect(bridgeConnectAdres, numPortToCon);
            }
            catch (Exception cnr)
            {
                WPB("fail during connect atempt to:{0}:{1}, err:{2}", bridgeConnectAdres, numPortToCon, cnr.Message);
                if (--bridgeReconectAtempt > 0 && keepBridgeListenerThreadAlive && incomingTcpClient.Connected)
                {
                    asyPrepBridgeFromClient.BeginInvoke(incomingTcpClient, baglData, null, incomingTcpClient);
                    return;
                }
            }

            WPB("after bridge client connect..to:{0}:{1}, status:{2}", bridgeConnectAdres, numPortToCon, clientCon.Connected);

            if (!clientCon.Connected)
            {
                if (--bridgeReconectAtempt > 0 && keepBridgeListenerThreadAlive && incomingTcpClient.Connected)
                {
                    WPB("bridging client failed to connect, ..atempting again to:{0}:{1}", bridgeConnectAdres, numPortToCon);
                    asyPrepBridgeFromClient.BeginInvoke(incomingTcpClient, baglData, null, incomingTcpClient);
                    return;
                }
                else
                {
                    WPB("bridging client failed to connect to:{0}:{1} !! and atempts delepted... stopping whole endeavor..", bridgeConnectAdres, numPortToCon);
                    STopTCPbridge();
                    return;
                }
            }


            WPB("..BOTH sides of bridge connected, ...preparing streams !!");
            // the comunication should start CP,  with "0f 00 01 02" ...so the first data should come from secured client ...


            bridge_PrepStreams(incomingTcpClient, clientCon, baglData);

        }

        void bridge_PrepStreams(TcpClient incomingTcpClient, TcpClient connectingTcpClient, Object[] baglData)
        {
            if (!keepBridgeListenerThreadAlive) return;


            var conClientNetStream = connectingTcpClient.GetStream();
            System.Net.Security.SslStream conClsslStream = new SslStream(conClientNetStream, false, new RemoteCertificateValidationCallback(bridgeConClientSRVsCertValidationKalba));

            try
            {
                if (sslClientCertifikat == null)
                    conClsslStream.AuthenticateAsClient("bridgeCip");
                else
                {
                    X509CertificateCollection clientCrtss = new X509CertificateCollection();
                    clientCrtss.Add(sslClientCertifikat);
                    conClsslStream.AuthenticateAsClient("bridgeCip", clientCrtss, false);
                }
            }
            catch (System.Security.Authentication.AuthenticationException authrr)
            {
                //     The authentication failed and left this object in an unusable state.
                WPB("bridge client AuthenticateAsClient AuthenticationException:{0}", authrr.Message);
                STopTCPbridge();
                return;
            }
            catch (System.InvalidOperationException ynr)
            {
                //     Authentication has already occurred. -or- Server authentication using this System.Net.Security.SslStream
                //     was tried previously. -or- Authentication is already in progress.
                WPB("bridge client AuthenticateAsClient InvalidOperationException:{0}", ynr.Message);
                STopTCPbridge();
                return;
            }
            catch (Exception aur)
            {
                WPB("bridge client AuthenticateAsClient fuckERR:{0}", aur.Message);
                STopTCPbridge();
                return;
            }

            // ...now you can dooo
            /*
            byte[] loginCipacket = new byte[] { 0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x40, 0xFF, 0xFF, 0xF1, 0x01 };
            conClsslStream.BeginWrite(loginCipacket, 0, loginCipacket.Length, new AsyncCallback((jasy) => {

                conClsslStream.EndWrite(jasy);
                WPA("loginpack sended...");
            }), sslconClsslStreamStream);
            */

            // bagl legenda >> { tcpBridgeConnectAdres, tcpBridgeConnectPort, incomingTcpClient,incoRecBuf,  conTCPclient, sslStrim, recbuf, null, null, null };

            baglData[2] = incomingTcpClient;
            baglData[4] = connectingTcpClient;
            baglData[5] = conClsslStream;

            bridge_secureConCli_ReRecive(incomingTcpClient, connectingTcpClient, conClsslStream, baglData);

            bridge_IncomingCli_ReRecive(incomingTcpClient, connectingTcpClient, baglData);

            /*
            baglData[3] = connectingTcpClient;
            baglData[4] = conClsslStream;

            byte[] conCliBuf = new byte[1024];
            baglData[5] = conCliBuf;

            conClsslStream.BeginRead(conCliBuf, 0, conCliBuf.Length, new AsyncCallback(bridge_conClient_AfterReading), baglData);
            */

        }     
        private bool bridgeConClientSRVsCertValidationKalba(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            if (vrbosePrint)
                WPA("bridgin client..incoming server cert:{0}, chain:{1}", certificate, chain);
            return true;
        }


        #region whenConectin secure Client REcive 
        void bridge_secureConCli_ReRecive(TcpClient incomingTcpClient, TcpClient connectingTcpClient, System.Net.Security.SslStream conClsslStream, Object[] baglData)
        {
            //baglData[4] = connectingTcpClient;
            //baglData[5] = conClsslStream;
            if (!keepBridgeListenerThreadAlive) return;
            byte[] conCliBuf = new byte[brdgBufSize];
            baglData[6] = conCliBuf;

            try
            {
                conClsslStream.BeginRead(conCliBuf, 0, conCliBuf.Length, new AsyncCallback(bridge_conClient_AfterReading), baglData);
            }
            catch (Exception rasi)
            {
                WPB("bridge_secureConCli_ReRecive err:{0}", rasi.Message);
            }
        }


        void bridge_conClient_AfterReading(IAsyncResult asi)
        {
            if (!keepBridgeListenerThreadAlive) return;
            Object[] baglData = (Object[])asi.AsyncState;

      //      WPB("---bridge_conClient_AfterReading---");

            // bagl legenda >> { tcpBridgeConnectAdres, tcpBridgeConnectPort, incomingTcpClient,incoRecBuf,  conTCPclient, sslStrim, recbuf, 6, 6, null };
            System.Net.Security.SslStream conClsslStream = (System.Net.Security.SslStream)baglData[5];
            byte[] conCliBuf = (byte[])baglData[6];
            TcpClient incomingTcpClient = (TcpClient)baglData[2];

            try
            {

                var readCount = conClsslStream.EndRead(asi);
                TcpClient connectingTcpClient = (TcpClient)baglData[4];

          //      WPB("---..._AfterReading--- readCount:{0}", readCount);

                if (readCount > 0)
                {
                    //var cleanBluf = conCliBuf.Take(readCount).ToArray();

                    var nistriim = incomingTcpClient.GetStream();

                    nistriim.Write(conCliBuf, 0, readCount);
                  //  nistriim.Write(cleanBluf, 0, cleanBluf.Length);
                    

                    //     bridge_procesDataFromConectingClient(baglData);

                    if (vrbosePrint)
                    {
                        WPA("forwarded FROM secure >> TO incoming, amount:{0}", readCount);
                    }

                    // connectingClient_ZEROrecToleratedCount = 5;
                    baglData[8] = 0;
                }
                else
                {
                    var hisZeroTolerancCounter = (int)baglData[8];
                    hisZeroTolerancCounter--;
                    baglData[8] = hisZeroTolerancCounter;
                    WPA("ZERO readed bytes encouteder !! in bridge_conClient_AfterReading, conectingClientIsConected:{0}, hisZeroTolerancCounter:{1}", connectingTcpClient.Connected, hisZeroTolerancCounter);
                    if (!connectingTcpClient.Connected)
                    {
                        return;
                    }
                    else if (hisZeroTolerancCounter < 1)
                    {
                        WPA("...connectingClient_ZEROrecToleratedCount DELEPTED !!");
                        return;
                    }
                }
               

               // TcpClient connectingTcpClient = (TcpClient)baglData[4];
                bridge_secureConCli_ReRecive(incomingTcpClient, connectingTcpClient, conClsslStream, baglData);

                if (recordCOmunicationToFile)
                {
                    if(connectingTcpClient != null && connectingTcpClient.Connected)
                    AddToDump(conCliBuf, readCount, ("From:" + connectingTcpClient.Client.RemoteEndPoint.ToString() + " To:" + incomingTcpClient.Client.RemoteEndPoint.ToString()));
                }

            }
            catch (Exception ern)
            {
                WPB("bridge_conClient_AfterReading endREad err:{0}", ern.Message);
            }
        }
        // useless for now...
        void bridge_procesDataFromConectingClient(Object[] baglData)
        {

          
        }

        #endregion whenConectin secure Client REcive ...end




        #region Incoming simple CLient REcive 
        void bridge_IncomingCli_ReRecive(TcpClient incomingTcpClient, TcpClient connectingTcpClient, Object[] baglData)
        {
            //baglData[4] = connectingTcpClient;
            //baglData[5] = conClsslStream;
            if (!keepBridgeListenerThreadAlive) return;
            byte[] incoRecBuf = new byte[brdgBufSize];
            baglData[3] = incoRecBuf;

            try
            {
                var niStrim = incomingTcpClient.GetStream();

                niStrim.BeginRead(incoRecBuf, 0, incoRecBuf.Length, new AsyncCallback(bridge_IncomingClient_AfterReading), baglData);
            }
            catch (Exception rasi)
            {
                WPB("...bridge_IncomingCli_ReRecive err:{0}", rasi.Message);
            }
        }


        /// <summary>
        /// when incoming unsecured client finished reading
        /// </summary>
        /// <param name="asi"></param>
        void bridge_IncomingClient_AfterReading(IAsyncResult asi)
        {
            if (!keepBridgeListenerThreadAlive) return;
            Object[] baglData = (Object[])asi.AsyncState;

            // bagl legenda >> { tcpBridgeConnectAdres, tcpBridgeConnectPort, incomingTcpClient,incoRecBuf,  conTCPclient, sslStrim, recbuf, null, null, null };

            byte[] incoRecBuf = (byte[])baglData[3];
            TcpClient incomingTcpClient = (TcpClient)baglData[2];
            TcpClient connectingTcpClient = (TcpClient)baglData[4];

            try
            {
               
                var niStrim = incomingTcpClient.GetStream();
                var readCount = niStrim.EndRead(asi);

                if (readCount > 0)
                {
                   // var cleanBluf = incoRecBuf.Take(readCount).ToArray();

                    System.Net.Security.SslStream conClsslStream = (System.Net.Security.SslStream)baglData[5];

                    // conClsslStream.Write(cleanBluf, 0, cleanBluf.Length);
                    conClsslStream.Write(incoRecBuf, 0, readCount);

                    if (vrbosePrint)
                    {
                        WPA("forwarded FROM Incoming >> TO secure, amount:{0}", readCount);
                    }

                    // bridge_procesDataFromIncomingClient(baglData);
                    // incomingCLient_ZEROrecToleratedCount = 6;
                    baglData[7] = 0;
                }
                else
                {
                    var hisZeroTolerancCounter = (int)baglData[7];
                    hisZeroTolerancCounter--;
                    baglData[7] = hisZeroTolerancCounter;

                    WPA("...ZERO readed bytes encouteder !! in bridge_IncomingClient_AfterReading, incoClientISconected:{0}, hisZeroTolerancCounter:{1}", incomingTcpClient.Connected, hisZeroTolerancCounter);
                    // however it seems that despite xpanel is already closed, ..this still reports IS connected...
                    if (!incomingTcpClient.Connected)
                    {
                        if (connectingTcpClient != null)
                        {
                            connectingTcpClient.Close();
                        }
                        return;
                    }
                    else if (hisZeroTolerancCounter < 1)
                    {
                        WPA("...incomingCLient_ZEROrecToleratedCount DELEPTED !!");

                        if (connectingTcpClient != null)
                        {
                            connectingTcpClient.Close();
                        }

                        return;
                    }

                }


               // TcpClient connectingTcpClient = (TcpClient)baglData[4];
                bridge_IncomingCli_ReRecive(incomingTcpClient, connectingTcpClient, baglData);

                if (recordCOmunicationToFile)
                {
                    AddToDump(incoRecBuf, readCount, ("from:" + incomingTcpClient.Client.RemoteEndPoint.ToString() + " ToSSL:" + connectingTcpClient.Client.RemoteEndPoint.ToString()));
                }

            }
            catch (Exception ern)
            {
                WPB("...bridge_IncomingClient_AfterReading endREad err:{0}", ern.Message);
                if (connectingTcpClient != null)
                {
                    connectingTcpClient.Close();
                }
            }
        }
        // useless for now..
        void bridge_procesDataFromIncomingClient(Object[] baglData)
        {
        }



        #endregion Incoming simple CLient REcive ...end


        public bool recordCOmunicationToFile = false;
        private void checkBox_fileDumoComs_CheckStateChanged(object sender, EventArgs e)
        {
            recordCOmunicationToFile = checkBox_fileDumoComs.Checked;
        }
        public bool toConForwardClienntWillUseSSL = false;
        private void checkBox_bridge_useSSL_CheckStateChanged(object sender, EventArgs e)
        {
            toConForwardClienntWillUseSSL = checkBox_bridge_useSSL.Checked;
            // TODO: for incoming conection prepare SSL listner ... for outgoing client make possible to be not ssl 
            // so fat NOT IMPLEMENTED
        }


        private List<string> CachedToDump = new List<string>();
        public void AddToDump(byte[] recbuf, int amoutRecived, object SomeIDentifuckator)
        {
            if (amoutRecived < 1) return;
      
            var txtID = "-WHO-";
            if (SomeIDentifuckator != null)
            {
                // TODO resolve what it is..client ? then his endpoint..
                txtID = SomeIDentifuckator.ToString();
            }

            var hexText = string.Format("{0}\t {1}\t {2}", DateTime.Now.TimeOfDay.ToString(), txtID, BitConverter.ToString(recbuf, 0, amoutRecived));
            var posernii = CachedToDump.Count > 0 ? ("" + CachedToDump.Last()) : "";
            if (posernii.Length < 1)
                CachedToDump.Add(hexText);
            else
            {
                if (posernii != hexText)
                    CachedToDump.Add(hexText);
                else
                    WPB("already there !!! {0}", CachedToDump.Count);
            }

            if ((CachedToDump.Count % 10) == 0)
            {
                WPA("CachedToDump.Count:{0}", CachedToDump.Count);
            }

        }

        private void button12_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(DUmpCAchedForwardsTOfile);
        }

        void DUmpCAchedForwardsTOfile()
        {
            var targetDir =  Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName + "\\Dumps";
            if (!Directory.Exists(targetDir))
            {
                Directory.CreateDirectory(targetDir);
            }
            var uniquetime = DateTime.Now.ToOADate().ToString();
            uniquetime = uniquetime.Substring(1 + uniquetime.LastIndexOf('.'));

            var targetFile = targetDir + "\\" + uniquetime + "_DUMP.txt";

            if (CachedToDump != null)
            {
                var looongString = string.Join("\x0D\x0A", CachedToDump);

              
                File.WriteAllText(targetFile, looongString, Encoding.UTF8);

                WPA("recorded data dumped to: {0}, total Len:{1}", targetFile, looongString.Length);

                CachedToDump.Clear();
            }
        }


        void showMEcharForm(string MEgaMishMash)
        {
            // expecting 27-63-72-65-73-74-72-6F-6E-3A-63-72-65-73-74-72-6F-6E
            if (string.IsNullOrEmpty(MEgaMishMash)) return;

            var casti = MEgaMishMash.Split(new char[] { '-', ' ', '\x0D', '\x0A' }, StringSplitOptions.RemoveEmptyEntries);
            string composedTExt = "";
            foreach (var chupar in casti)
            {
                if (chupar.Length == 2)
                {
                   // int.Parse(chupar, NumberStyles.AllowHexSpecifier);
                    var nacislo = byte.Parse(chupar, NumberStyles.AllowHexSpecifier);
                    if (nacislo > 31)
                    {
                        var nachrchel = (char)nacislo;
                        composedTExt += nachrchel;
                    }
                    else
                    {
                        var someExpresionToShow = nacislo.ToString("X2") + "-";
                        if (composedTExt.EndsWith("-"))
                            composedTExt += someExpresionToShow;
                        else
                            composedTExt += ("-" + someExpresionToShow);
                    }

                }
                else if(chupar.Length > 0)
                {
                    WPB("wrong input of:{0}", chupar);
                }
            }

            WPB("resutling: {0}", composedTExt);

        }











        #region crpc exploring ...


        private void button15_Click(object sender, EventArgs e)
        {
            var tosusun = string.Copy(textBox2.Text);
            var posledniZhrbenaa = tosusun.LastIndexOf('}');
            if (posledniZhrbenaa > -1)
            {
                var jenVrchniPuket = tosusun.Substring(0, 1+posledniZhrbenaa);
                tosusun = jenVrchniPuket;
            }
            SUFLER_ASN(quickPeekClientSend, tosusun);
        }
        private void button14_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(quickPeekClient);
        }


        void quickPeekClientSend(string tosund)
        {
            if (string.IsNullOrEmpty(tosund))
                tosund = "";
            if (quickclin != null)
            {
                if (quickclin.Connected)
                {
                    if (quickpeeksttrim == null)
                        quickpeeksttrim = quickclin.GetStream();

                    if (tosund.Contains("{"))
                    {
                        // if capsulate jso crpc..

                        if (tosund.Contains("}.."))
                        {
                            WPA("...multi shitpacket tosend ???");
                            // if by stupidyty copypasted double packet with unprintet header..
                            var presplyt = tosund.Split(new string[] { "}.." }, StringSplitOptions.RemoveEmptyEntries);
                            presplyt = presplyt.Select(ka => { if (!ka.EndsWith("}")) ka += "}"; return ka; }).ToArray();      // putting back what we taken
                            presplyt = presplyt.Select(kua => { if (!kua.StartsWith("{")) kua = kua.Substring(2); return kua; }).ToArray();
                            foreach (var onepackal in presplyt)
                            {
                                if (tosund != onepackal)
                                    quickPeekClientSend(onepackal);
                            }

                            return;
                        }

                        var targertMediaPlayerMenu = "MediaPlayerMenu" + medplayInstaNum;  // like MediaPlayerMenu1  ,  MediaPlayerMenu2
                        var targertMediaPlayer = "MediaPlayer" + medplayInstaNum;
                        if (medplayInstaNum != "1")
                        {
                            tosund = tosund.Replace("MediaPlayerMenu1", targertMediaPlayerMenu);
                            tosund = tosund.Replace("MediaPlayer1", targertMediaPlayer);
                        }

                        tosund = tosund.Trim(' ', '\x0D', '\x0A', '\n');
                        tosund = prependCrpcHudr(tosund, "\x01");
                    }

                    //var sbuf = Encoding.UTF8.GetBytes(tosund);
                    var sbuf = tosund.Select(be => (byte)be).ToArray();

                  //  var dbginfopak = BitConverter.ToString(sbuf, 0);
                  //  WPA("sending:{0}", dbginfopak);

                    quickpeeksttrim.BeginWrite(sbuf, 0, sbuf.Length, new AsyncCallback((yosi) => {

                        quickpeeksttrim.EndWrite(yosi);
                        WPA("sended.. len {0}", sbuf.Length);
                    }), quickpeeksttrim);
                }
            }
        }

        string prependCrpcHudr(string crpcjasandata, string fourthByteZerOrOne)
        {
            // like >> 14 00 54 01 7B ...  14 [numbytes folow upper] [numbytes folow lowwer] 01 [{"method....]
            
            if (string.IsNullOrEmpty(fourthByteZerOrOne)) fourthByteZerOrOne = "\x01";      // mostly 01 but register pack have 14 00 DD 00 7B

            if (string.IsNullOrEmpty(crpcjasandata)) return "\x14\x00\x00\x01";

            var combopack = "\x14";

            crpcjasandata = crpcjasandata.Trim(' ', '\x0D', '\x0A');

            var textlen = crpcjasandata.Length;
            ushort informedlen = (ushort)(1 + textlen);
            if (informedlen > 255)
            {
                //WPA("...to to to loong..!!! {0}", informedlen);
                var damount = BitConverter.GetBytes(informedlen);
                if (BitConverter.IsLittleEndian)
                    Array.Reverse(damount);
                var txtform = new string(damount.Select(scb => (char)scb).ToArray());
                combopack+= txtform + fourthByteZerOrOne + crpcjasandata;
            }
            else
                combopack = "\x14\x00" + ("" + (char)((byte)informedlen)) + fourthByteZerOrOne + crpcjasandata;
            crpcjasandata = string.Copy(combopack);
            return crpcjasandata;
        }

        // legendary way to roz-shift number to bytearr
        byte[] YntgToButes(int numeroToBytes)
        {
            byte[] bytes = new byte[4];

            bytes[0] = (byte)(numeroToBytes >> 24);
            bytes[1] = (byte)(numeroToBytes >> 16);
            bytes[2] = (byte)(numeroToBytes >> 8);
            bytes[3] = (byte)numeroToBytes;
            return bytes;
        }

        
        bool quickMaygo = false;
        NetworkStream quickpeeksttrim = null;
        TcpClient quickclin = null;
        string medplayInstaNum = "1";
        void quickPeekClient()
        {
            // little cprpc looking...

            if (quickMaygo)
            {
                quickMaygo = false;
                WPA("..left for dead");
                if (quickclin != null)
                {
                    quickclin.Close();
                    quickclin = null;
                }
                return;
            }

            var custoConParams = textBox_CrpcInstaIPaPORT.txtBoxSafeReader();
            quickMaygo = true;

            var targIP = "192.168.166.242";
            var targPort = 50011;

            if (custoConParams != null && custoConParams.Length > 0)
            {
                var prtky = custoConParams.Split(new char[] { ':', ';', ',', '+' }, StringSplitOptions.RemoveEmptyEntries);
                if (prtky.Length < 3)
                    prtky = new string[] { prtky[0], "192.168.166.242", "50011" };
                medplayInstaNum = prtky[0];
                targIP = prtky[1];
                targPort = int.Parse(prtky[2]);
            }

            X509CertificateCollection clicol = null;
            var maybePrasord = textBox5_clientCRTpass.txtBoxSafeReader();
            var clientCertPath = textBox5_clientCert.txtBoxSafeReader();

            if (toConForwardClienntWillUseSSL)
            {
                if (File.Exists(clientCertPath))
                {

                    X509Certificate cx509 = null;
                    if (string.IsNullOrEmpty(maybePrasord))
                    {
                        cx509 = X509Certificate.CreateFromCertFile(clientCertPath);
                    }
                    else
                    {
                        cx509 = new X509Certificate(clientCertPath, maybePrasord);
                    }

                    if (cx509 != null)
                        clicol = new X509CertificateCollection(new X509Certificate[] { cx509 });

                    WPA("using client cert:{0}", cx509.GetCertHashString());
                }
            }

            var tClient = new TcpClient();
            quickclin = tClient;
            zeroRecivedDeCounter = 6;

            tClient.Connect(IPAddress.Parse(targIP), targPort);

            WPA("con to:{0}:{1} >> suces:{2}", targIP, targPort, tClient.Connected);
            if (!tClient.Connected)
            {
                tClient.Dispose();
                return;
            }
            
            var recbuf = new byte[2048];

            SslStream sslStream = null;
            var nstriim = tClient.GetStream();
            quickpeeksttrim = nstriim;

            if (clicol != null && clicol.Count > 0)
            {
                sslStream = new SslStream(nstriim, false, new RemoteCertificateValidationCallback(clientSideCertificateValidationCallback));

                //Authenticate 
                if (clicol == null)
                    sslStream.AuthenticateAsClient("clientName");
                else
                    sslStream.AuthenticateAsClient("clientName", clicol, false);

                if (!sslStream.IsAuthenticated)
                {
                    WPA("ssl strim is NOT authenticated !!!");
                    tClient.Dispose();
                    return;
                }
                sslStream.BeginRead(recbuf, 0, recbuf.Length, quickPeekAfterRec, new object[] { tClient, nstriim, recbuf, sslStream });
            }

            
            nstriim.BeginRead(recbuf, 0, recbuf.Length, quickPeekAfterRec, new object[] { tClient, nstriim, recbuf, sslStream });

            // some initial packet >>>  
            // 13 00 19 00 03 C3 5B 40 02 FF FF F9 01 31 39 32 2E 31 36 38 2E 31 36 36  2E 32 34 32        like  [@.....192.168.166.242
            // byte[] loginCipacket = new byte[] { 0x01, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A, 0x40, 0xFF, 0xFF, 0xF1, 0x01 };
            // nstriim.Write(loginCipacket, 0, loginCipacket.Length);
            var posiblelogin = "\x13\x00\x19\x00\x03\xC3\x5B\x40\x02\xFF\xFF\xF9\x01" + targIP;
            var nablito = posiblelogin.Select(ba => (byte)ba).ToArray();
            // nstriim.Write(nablito, 0, nablito.Length);
            nstriim.BeginWrite(nablito, 0, nablito.Length, new AsyncCallback(posi => { nstriim.EndWrite(posi); }), nablito);
            WPA("entry msg sended...");
        }

        string[] sequentialyDisectBracketed(string someHexJasnoCombo)
        {
            if (string.IsNullOrEmpty(someHexJasnoCombo)) return new string[0];
            var byHadrByteSpluted = someHexJasnoCombo.Split(new char[] { '\x14' }, StringSplitOptions.RemoveEmptyEntries);
            if (byHadrByteSpluted.Length > 0)
            {
                for (int i = 0; i < byHadrByteSpluted.Length; i++)
                {
                    if (!byHadrByteSpluted[i].StartsWith("{"))
                    {
                        var jasanStartindex = byHadrByteSpluted[i].IndexOf("{");
                        if (jasanStartindex < 0)
                        {
                            WPB("Noooo bracket index !!! >> {0}", byHadrByteSpluted[i]);
                        }
                        else
                        {
                            byHadrByteSpluted[i] = byHadrByteSpluted[i].Substring(jasanStartindex);
                        }
                    }
                }
            }

            return byHadrByteSpluted;
        }

        string gadheringfullRawBuf = "";
      //  string gadheringBufWithStartingBracket = "";
      //  string gadheringBufNoStartBracket = "";
        int zeroRecivedDeCounter = 6;

        int anoucedPackedLen = -1;
        bool anoucedPackedComplete = true;
        void quickPeekAfterRec(IAsyncResult iasi)
        {
            if (!quickMaygo) return;
            object[] data = (object[])iasi.AsyncState;
            TcpClient tClient = (TcpClient)data[0];
            NetworkStream nstriim = (NetworkStream)data[1];
            byte[] recbuf = (byte[])data[2];
            SslStream sslStream = (SslStream)data[3];

            int kolyk = -1;
            if (sslStream != null)
                kolyk = sslStream.EndRead(iasi);
            else
                kolyk = nstriim.EndRead(iasi);

            if (kolyk > 0)
            {
                zeroRecivedDeCounter = 6;

                var cleanbuf = recbuf.Take(kolyk).ToArray();

                if (!quickMaygo) return;

                var textlike = new string(cleanbuf.Select(bee => (char)bee).ToArray());
              //  var textlikeTEXT = Encoding.UTF8.GetString(cleanbuf);

                if (sslStream != null)
                    sslStream.BeginRead(recbuf, 0, recbuf.Length, quickPeekAfterRec, new object[] { tClient, nstriim, recbuf, sslStream });
                else
                    nstriim.BeginRead(recbuf, 0, recbuf.Length, quickPeekAfterRec, new object[] { tClient, nstriim, recbuf, sslStream });

                //var textlike = Encoding.UTF8.GetString(cleanbuf);
           //     var textlike = new string(cleanbuf.Select(bee => (char)bee).ToArray());
               // var hexrepr = BitConverter.ToString(cleanbuf, 0);


                if (cleanbuf[0] == 0x02 && cleanbuf[1] == 0x00)
                {
                    // response to login ? 
                    // 02 00 04 00 32 00 01  next was ... 02 00 04 00 34 00 01   some is inkrementing...  02 00 04 00 3C 00 01  
                    // send hevy json register pucket...

                    var jasjemCryplRegiPucket = composeJsonCrpCregPacket("");

                    //var bytest = Encoding.UTF8.GetBytes(prehudred);
                    var bytest = jasjemCryplRegiPucket.Select(bee => (byte)bee).ToArray();
                    nstriim.BeginWrite(bytest, 0, bytest.Length, new AsyncCallback(posi => { nstriim.EndWrite(posi); }), bytest);
                    WPA("HEV REg packet sened... {0}>>> \n {1}", bytest.Length, BitConverter.ToString(bytest));

                }
                else if (cleanbuf[0] == 0x14)
                {
                    // cleanbuf[1] == can be 0x00 or 0x01  ...dont know the logic of it so far...
                    // if (cleanbuf[1] != 0x00) { WPA("that..is actualy wrong >> {0}", hexrepr); }
                    //  var spluted = textlike.Split(new string[] { "\x14\x00", "\x14\x01", "\x14\x02", "\x14\x05" }, StringSplitOptions.RemoveEmptyEntries);
                    // spluted = spluted.Select(stux => { return stux.Substring(2); }).ToArray();
                    //WPA("spluted amount: {0}", spluted.Length);
                    //  if (spluted.Length == 1)
                    //    WPA("ONE plust: {0}", string.Join("", spluted));

                    if (cleanbuf.Length > 3)
                    {
                        byte[] expectedAmoutBajts = null;
                        if (!BitConverter.IsLittleEndian)
                            expectedAmoutBajts = new byte[] { cleanbuf[1], cleanbuf[2] };
                        else
                            expectedAmoutBajts = new byte[] { cleanbuf[2], cleanbuf[1] };

                        this.anoucedPackedLen = BitConverter.ToUInt16(expectedAmoutBajts, 0);

                        if (anoucedPackedLen < cleanbuf.Length)
                        {
                            this.anoucedPackedComplete = true; 
                        }
                        else if (anoucedPackedLen > cleanbuf.Length)
                        {
                            this.anoucedPackedComplete = false;
                            gadheringfullRawBuf = textlike;
                        }

                      
                        if (this.anoucedPackedComplete)
                        {
                            
                            var spluted = sequentialyDisectBracketed(textlike);

                            foreach (var onepakar in spluted)
                            {

                                if (!onepakar.EndsWith("}"))
                                {   
                                  //  gadheringBufNoStartBracket = "";
                                  //  gadheringBufWithStartingBracket = onepakar;
                                    WPB("unfinished packet ?? IN COMPLETE packet ?? curent len:{0}, multiheadererlen:{1}", onepakar.Length, spluted.Length);
                                }
                                else
                                {
                                    WPA("from maybeMulti:{0}, regular:>>> {1}", spluted.Length, onepakar);
                                }
                            }                            
                        }
                        else
                        {
                           // gadheringBufNoStartBracket = "";
                            //gadheringBufWithStartingBracket = textlike;
                        }

                        WPB("incoming packet len:{0} vs anouced:{1}, ", cleanbuf.Length, anoucedPackedLen);      //incoming packet len:419 vs anouced:416,  64 vs 61

                    }
                }
                else if (cleanbuf[0] == 0x0D && cleanbuf[1] == 0x00)
                {
                    // ..guessing some sort of heartbeat...
                    // 0D 00 02 00 3C       ..answear 0E 00 02 00 3C and rewerse..
                    var resprdl = new byte[] { 0x0E, 0x00, 0x02, 0x00, 0x3C };
                    if (cleanbuf.Length > 4)
                        resprdl[4] = cleanbuf[4];       // last byte is shifting ???
                    nstriim.BeginWrite(resprdl, 0, resprdl.Length, new AsyncCallback(posi => { nstriim.EndWrite(posi); }), resprdl);

                }
                else if (cleanbuf[0] == 0x0E && cleanbuf[1] == 0x00)
                {
                    // ..guessing some sort of heartbeat...
                    // 0D 00 02 00 3C       ..answear 0E 00 02 00 3C and rewerse..
                    var resprdl = new byte[] { 0x0D, 0x00, 0x02, 0x00, 0x3C };
                    if (cleanbuf.Length > 4)
                        resprdl[4] = cleanbuf[4];       // last byte is shifting ???
                    nstriim.BeginWrite(resprdl, 0, resprdl.Length, new AsyncCallback(posi => { nstriim.EndWrite(posi); }), resprdl);
                }
                else
                {

                    JObject jaPraseObjehovee = null;

                    if (!this.anoucedPackedComplete)
                    {
                        gadheringfullRawBuf += textlike;
                        if (gadheringfullRawBuf.Length >= this.anoucedPackedLen)
                        {
                            this.anoucedPackedComplete = true;
                            string safelyCariedAWayFromBattle = string.Copy(gadheringfullRawBuf);

                            if (!safelyCariedAWayFromBattle.StartsWith("{"))
                            {
                                var jasanStartindex = safelyCariedAWayFromBattle.IndexOf("{");
                                if (jasanStartindex < 0)
                                {
                                    WPB("kaine bracket index !!! >> {0}", safelyCariedAWayFromBattle);
                                }
                                else
                                {
                                    safelyCariedAWayFromBattle = safelyCariedAWayFromBattle.Substring(jasanStartindex);
                                }
                            }

                            var zpejtneNabajty = safelyCariedAWayFromBattle.Select(bleee => (byte)bleee).ToArray();
                            var aNautfText = Encoding.UTF8.GetString(zpejtneNabajty);

                            WPA("chunked len:{0} Done>>: {1}", aNautfText.Length, aNautfText);
                          //  WPA("chunked len:{0} Done>>: {1}", safelyCariedAWayFromBattle.Length, safelyCariedAWayFromBattle);
                            jaPraseObjehovee = cautiousPraseAtempt(safelyCariedAWayFromBattle);
                            if (jaPraseObjehovee != null)
                            {
                                WPB("chunked buf prasek OK !!");
                                return;
                            }

                        }
                    }

                  //  gadheringBufNoStartBracket += textlike;

                    WPA("recived textlike: len:{0}", textlike.Length);
                    // it may be continuing of packet that dind fit into our buffer 2048
                    //   WPA("recived hex:{0}", hexrepr);

                    // var readableifposable = new string(textlike.Where(lenty => lenty > 31 && lenty < 127).ToArray());

                    //WPA("recived hex:{0}, textlike:{1}, len:{2}", hexrepr, readableifposable, textlike.Length);
                    //  WPA("recived textlike:{0}, len:{1}", readableifposable, textlike.Length);
                    /*
                                     if (textlike.EndsWith("}"))
                                     {
                                         var pohroma = (gadheringBufWithStartingBracket + gadheringBufNoStartBracket);
                                         WPA("combined A:{0}, with B:{1} = {2},  gadrbuf: {3}", gadheringBufWithStartingBracket.Length, gadheringBufNoStartBracket.Length, pohroma.Length, pohroma);

                                         gadheringBufNoStartBracket = "";
                                         jaPraseObjehovee = cautiousPraseAtempt(pohroma);

                                         if (jaPraseObjehovee != null)
                                         {
                                             WPB(" jaa prase ok..");
                                         }
                                     }
                                     else
                                     {
                                         WPA("recived textlike: len:{0}", textlike.Length);
                                     }
                                     */
                }
               
            }
            else
            {
                WPA("zero recited...");
                zeroRecivedDeCounter--;

                if (quickMaygo)
                {
                    if (tClient.Connected)
                    {
                        if (zeroRecivedDeCounter > 0)
                            nstriim.BeginRead(recbuf, 0, recbuf.Length, quickPeekAfterRec, new object[] { tClient, nstriim, recbuf, sslStream });
                    }
                    else
                    {
                        WPA("reconnecting...");
                        SUFLER_ASN(quickPeekClient);
                        return;
                    }
                }
            }

        }

        JObject cautiousPraseAtempt(string tobePraseAtempted)
        {
            if (tobePraseAtempted == null || tobePraseAtempted.Length < 1) return null;

            try
            {
                var zaabeh = JObject.Parse(tobePraseAtempted);
                return zaabeh;
            }
            catch (JsonReaderException jaser)
            {
                WPB("jasrano {0} at line:{1}, pos:{2}", jaser.Message, jaser.LineNumber, jaser.LinePosition);
                return null;
            }
            catch (Exception jer)
            {
                WPB("jerryho jasnaa jeblost:{0}", jer.Message);
                return null;
            }
        }


        int crpcMSGid = 90000;
        string composeJsonCrpCregPacket(string laterrez)
        {
            // combo special ...also prepend header
            // anon defa >> 
            // var v = new { Amount = 108, Message = "Hello" };
            var someGajde = Guid.NewGuid().ToString().ToUpper();
            crpcMSGid++;
          
            // var txtOnepacket = @"{""params"":{""ver"":""1.0"",""uuid"":""2A9C2FC5-8D42-1524-EBE6-9FD74227F625"",""type"":""cip-direct/json-rpc"",""encoding"":""UTF-8"",""format"":""JSON"",""maxPacketSize"":65535,""name"":""Smart Graphics=2.19.00.09_api=29""},""jsonrpc"":""2.0"",""metho....d"":""Crpc.Register"",""id"":86626}";
            var txtOnepacket = @"{""params"":{""ver"":""1.0"",""uuid"":""-GUID-"",""type"":""cip-direct/json-rpc"",""encoding"":""UTF-8"",""format"":""JSON"",""maxPacketSize"":65535,""name"":""Smart Graphics=2.19.00.09_api=29""},""jsonrpc"":""2.0"",""metho";
            txtOnepacket = txtOnepacket.Replace("-GUID-", someGajde);

            var sedondpart = @"d"":""Crpc.Register"",""id"":-TRANSNUM-}";
            sedondpart = sedondpart.Replace("-TRANSNUM-", $"{crpcMSGid}");

            var prehudredA = prependCrpcHudr(txtOnepacket, "\x00");
            var prehudredB = prependCrpcHudr(sedondpart, "\x01");

            return (prehudredA + prehudredB);
        }



        #endregion crpc exploring ...end


        public BindingFlags vufagy = BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Static |
            BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.GetField | BindingFlags.SetField |
            BindingFlags.GetProperty | BindingFlags.SetProperty | BindingFlags.IgnoreReturn;


        private void button17_Click(object sender, EventArgs e)
        {
            /*
            var tupec = this.lastKunda.GetType();
            if (tupec.BaseType != null)
                tupec = tupec.BaseType;
            
            var mambry = tupec.GetMembers(vufagy);
            WPB("mabru je :{0}", mambry.Length);
            foreach (var mimbra in mambry)
            {
                WPB("mumber: {0} {1}", mimbra.Name, mimbra.MemberType);
            }
            
         //   var jinak = tupec.GetRuntimeFields();
          //  foreach (var fidel in jinak) WPA("jinejtypec: {0}", fidel);
            var tifiici = tupec.GetFields(vufagy);
            foreach (var field in tifiici)
            {
                WPB("fik: {0} {1}", field.Name, field.FieldType);
            }
            */

            var totalRotal = "C:\\";
            WPA("exi:{0}, {1}", Directory.Exists(totalRotal), totalRotal);
            var parentTovoid = Directory.GetParent(totalRotal);
            WPA("parent exi:{0}, {1}", Directory.Exists(parentTovoid.FullName), parentTovoid);


        }

        private void button18_Click(object sender, EventArgs e)
        {
            /*
            var kope = JToken.FromObject("aaa7");
            WPB("kope:{0}, {1}, hasvalues:{2}", kope.Type, kope, kope.HasValues);

            if (kope.HasValues)
            {
                var atemptpadem = kope["kukej"];
                WPA("takze: {0}", atemptpadem);
            }
            
            var jenFilename = Path.GetFileName(saveFile);
            var jenHisResidingDira = Path.GetDirectoryName(saveFile);
            var parterent = Directory.GetParent(jenHisResidingDira);

            var uperLocation = parterent.FullName + "\\" + jenFilename;

            WPA("file:{0}\r\n curentHisDira> {1}\r\n parent> {2}\r\n posibleUP:{3}", jenFilename, jenHisResidingDira, parterent.FullName, uperLocation);

            */
            /*
            var testFilePatha = Directory.GetCurrentDirectory() + "\\ZALconfigSaved.json";
            var freslyFoundedTreasure = string.Empty;
            if (Extaazions.ClaimUPandSearchForFile(testFilePatha, 33, ref freslyFoundedTreasure))
                WPA("founded upper:{0}", freslyFoundedTreasure);
            else
                WPA("KEINE upper power... ");
            */
            var tadiira = Directory.GetParent(Directory.GetCurrentDirectory()).FullName + "\\ponsite.pfx";
            WPA("je tam? >> {0} , {1}", tadiira, File.Exists(tadiira));
                     
        }

        private void button19_Click(object sender, EventArgs e)
        {
            var hopefulySomeLocation = Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\ponsite.pfx";
            // C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\Debug\\SSL_Server\\certs\\ponsite.pfx
            WPA("{0} .. {1}",hopefulySomeLocation, Directory.GetCurrentDirectory());
            WPB("is same {0}", hopefulySomeLocation == "C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\Debug\\SSL_Server\\certs\\ponsite.pfx");
            /*
            var pokusjj = textBox2.txtBoxSafeReader();

            try
            {
                //    var rezuzu = JToken.Parse(pokusjj);
                var rezuzu = JValue.Parse(pokusjj);     // ..seems most versatile for parsing is Jvalue !!
                // var rezuzu = JsonConvert.DeserializeObject(pokusjj);
            //    WPA("ok, type:{0}, data:{1}", rezuzu.GetType().Name, rezuzu);
                  WPA("ok, type:{0},hasvals:{1}, daata:{2}", rezuzu.Type, rezuzu.HasValues, rezuzu);
            }
            catch (Exception ex)
            {
                WPA("..failed:{0} ", ex.Message);
            }
            */
        }

        private void comboBox1_SelectionChangeCommitted(object sender, EventArgs e)
        {
            if (comboBox1.SelectedItem != null)
            {
                if (comboBox1.SelectedItem is crpcSnipets)
                {
                    textBox2.Text = ((crpcSnipets)comboBox1.SelectedItem).Value;
                }
            }

         
        }


        #region websocket devising 
        // idea is to make websocket (ss if possible), with https server as a signaling service for makng WEBrtc clients possible ...
        // so first we have make some simple webchat interchange...

        // C:\WLOZ\gstreamer\webRTC\KK\RTC
        private void button20_ws_start_Click(object sender, EventArgs e)
        {
            //  SUFLER_ASN(syyysWStest, "C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\Debug\\SSL_Server\\certs\\ponsite.pfx;crestron");
            //  SUFLER_ASN(syyysWStest, "C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\ponsite.pfx;crestron");
            // or ..justt
            SUFLER_ASN(syyysWStest, string.Empty);
        }

        private void button20_stop_ws_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(webSuckStop);
        }
        private void button20_Click(object sender, EventArgs e)
        {
            if (wsskunda == null) return;
            var coposrat = "" + textBox1.Text;  // from first box
            SUFLER_ASN(BroadChlastToAllWS, coposrat);
            // answear expect in textbox2
        }
        private void button21_Click(object sender, EventArgs e)
        {
            SUFLER_ASN(resyncSrvClientsWithAliasNames);
        }

        WebSocketSharp.Server.WebSocketServer wsskunda = null;

        public void webSuckStop()
        {
            if (wsskunda != null)
            {
                wsskunda.Stop();
                wsskunda.WebSocketServices.Clear();
                wsskunda = null;

                WPA("killing kundu ...");
                return;
            }
        }

        // initial port from Cuwasar ...
        // syyysWStest:/simpl/app03/crtSome/ponsite.pfx;crestron  
        // in order to work... the browser MUST first attempt open the wss as https to create security expetion ..
        // ..like https://127.0.0.1:9995/kunda
        public void syyysWStest(string someparams)
        {
            if (wsskunda != null)
            {
                webSuckStop();
                return;
            }

            /*
            if (SecureUse)
            {
                if (sslCertificate == null)
                {
                    if (!string.IsNullOrEmpty(textBox5_certifPath.Text))
                    {
                        var custoCertPasss = textBox3.txtBoxSafeReader();
                        var custoCertPath = textBox5_certifPath.txtBoxSafeReader();

                        if (string.IsNullOrEmpty(custoCertPasss))
                            custoCertPasss = "crestron";

                        SUFLER(getSpeciCertificate, custoCertPath, custoCertPasss);
                    }
                    else
                    {
                        SUFLER(getSpeciCertificate, Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\seru_cubu.pfx", "crestron");
                    }
                }
            }
            */

            string certpass = "";
            if (someparams.isNullOrEmpty())
            {
                // C:\\WLOZ\\wo\\V4\\reCreateHTTPsrv\\httpFormSSLsrvv\\bin\\Debug\\SSL_Server\\certs\\ponsite.pfx
                var hopefulySomeLocation = Directory.GetParent(Directory.GetCurrentDirectory()).FullName + "\\ponsite.pfx";
                if (File.Exists(hopefulySomeLocation))
                    someparams = hopefulySomeLocation;
                else
                    hopefulySomeLocation = Directory.GetCurrentDirectory() + "\\SSL_Server\\certs\\ponsite.pfx";    // originaly used..
                if (File.Exists(hopefulySomeLocation))
                    someparams = hopefulySomeLocation;
                certpass = "crestron";
            }
            else
            {
                var pathaApassa = someparams.Splyte(',', ';');
                if (pathaApassa.Length < 2)
                    pathaApassa = new string[] { someparams, "crestron" };

                certpass = string.Copy(pathaApassa[1]);
                someparams = string.Copy(pathaApassa[0]);
            }

            if (!System.IO.File.Exists(someparams))
            {
                WPA("specified certfile:{0} not seeend !!", someparams);
                return;
            }

            var targetWSportTXT = textBox5_portWSS.txtBoxSafeReader();
            int targetWSport = targetWSportTXT.isNullOrEmpty() ? 9995 : int.Parse(targetWSportTXT);

            var targetListenAdres = "0.0.0.0";
            targetListenAdres = textBox5_ip.txtBoxSafeReader();           

            wsskunda = new WebSocketSharp.Server.WebSocketServer(System.Net.IPAddress.Parse(targetListenAdres), targetWSport, true);
            wsskunda.AddWebSocketService<Lakunda>("/kunda");
            wsskunda.KeepClean = true;

            wsskunda.Log.Output += new Action<WebSocketSharp.LogData, string>((lugrdata, masage) =>
            {
                // this suprisingly  ..firing when clients disconect... eg ..close tab..
                // eg it gous lik>> "The closing was clean? True (sent: True received: True)"
                if (vrbosePrint)
                    WPA("wsskunda LOG:{0}", lugrdata.Message.Replace("\x0A", "\x0A\x0D"));
                // if onclose event inside behavior lakunda wont suffice... we may supply it heere ...
                // ...not using for now ...
                //if (lugrdata.Message.Contains("closing was clean"))
                  //  SUFLER_ASN(resyncSrvClientsWithAliasNames);

            });
            wsskunda.Log.Level = WebSocketSharp.LogLevel.Debug;

            wsskunda.SslConfiguration.ServerCertificate = new System.Security.Cryptography.X509Certificates.X509Certificate2(someparams, certpass);
            WPA("for ssl cert using: {0}", wsskunda.SslConfiguration.ServerCertificate.FriendlyName);
            //wsskunda.SslConfiguration.CheckCertificateRevocation = false;
            wsskunda.SslConfiguration.ClientCertificateRequired = false;

            wsskunda.SslConfiguration.ClientCertificateValidationCallback = (sender, certificatete, chain, sslPolicyErrors) => {
                if (vrbosePrint)
                {
                    if (certificatete == null)
                        WPA("incoming wss client certificate is NULL !!");
                    else
                        WPA("..on client cert validution buk {0}, {1}", certificatete.Issuer, certificatete.Subject);
                }
                return true;
            };

            wsskunda.AuthenticationSchemes = WebSocketSharp.Net.AuthenticationSchemes.Anonymous;
            wsskunda.UserCredentialsFinder = (id) => {
                WPA("user kredenc bak:{0}", id.ToString());
                var name = id.Name;
                // Return user name, password, and roles.
                /*
                return name == "nobita"
                       ? new sysws.WebSocketSharp.Net.NetworkCredential(name, "crestron", "gunfighter")
                       : null; 
                */
                return new WebSocketSharp.Net.NetworkCredential(name, "crestron", "gunfighter");
            };

            wsskunda.Realm = "sysWS test";
            wsskunda.SslConfiguration.EnabledSslProtocols =
                System.Security.Authentication.SslProtocols.Tls12 |
                System.Security.Authentication.SslProtocols.Tls13;


            WPA("wskunda sslprots:{0}", wsskunda.SslConfiguration.EnabledSslProtocols.ToString());

            wsskunda.Start();

            var infoToConnectAdress = wsskunda.Address.ToString();
            infoToConnectAdress = infoToConnectAdress == "0.0.0.0" ? "127.0.0.1" : infoToConnectAdress;

            WPA("wss kunda is running:{0}, at: wss://{1}:{2}/kunda", wsskunda.IsListening, infoToConnectAdress, wsskunda.Port);

        }
        public void BroadChlastToAllWS(string data)
        {
            if (wsskunda != null)
            {
                foreach (var pluta in wsskunda.WebSocketServices.Paths)
                {
                    var susionmuger = wsskunda.WebSocketServices[pluta];
                    if (susionmuger != null)
                    {

                        var subseskymager = susionmuger.Sessions;

                        subseskymager.Broadcast(data);

                        // or >>>
                        /*
                        var samotnewocky = subseskymager.Sessions;
                        foreach (var wocka in samotnewocky)
                        {
                            if (wocka is Lakunda)
                            {
                                Lakunda kukunda = (Lakunda)wocka;
                                kukunda.Seend(data);
                            }
                        }
                        */
                    }
                }
            }
        }

        /// <summary>
        /// main global websocket incoming data process..
        /// </summary>
        /// <param name="e"></param>
        /// <param name="relatedHavior"></param>
        public void OnWSSincomingMSG(WebSocketSharp.MessageEventArgs e, Lakunda relatedHavior)
        {
            SUFLER_ASN(_onnWSSincomingMSG, e, relatedHavior);
        }

        /// <summary>
        /// main global websocket incoming data process..
        /// </summary>
        /// <param name="e"></param>
        /// <param name="relatedHavior"></param>
        private void _onnWSSincomingMSG(WebSocketSharp.MessageEventArgs e, Lakunda relatedHavior)
        {
            if (e.Data != null)
            {
                var txtData = e.Data;

                if (vrbosePrint)
                    WPB("ws:{0}, rcv>> {1}", relatedHavior.uuserEndPoint, txtData);

                // ..it should be an object with 'type':xxxx, 'value':megadata
                // type ... letsay >> eval, general, broadcast, chat, login, invite, offer, answear, candidates, refresh, userslist

                JContainer jsonDataOb;
                if (txtData.TriPrase(out jsonDataOb))
                {
                    //jsonDataOb["type"]
                    //var dementsEntry = ((IList<JToken>)jsonDataOb).ToArray();
                    if (vrbosePrint)
                        WPB("ws incoming parsed json typ:{0},hasvals:{1}, j:{2}", jsonDataOb.Type, jsonDataOb.HasValues, jsonDataOb);
                    /* ..indeed not trigering >> 
                    if (jsonDataOb is IDictionary<string, object>)
                    {
                        IDictionary<string, object> someDyked = (IDictionary<string, object>)jsonDataOb;
                        WPB("je to simpleDyked with objects, keys:{0}", someDyked.Keys.ToArray().GivmeRow("; "));
                    }*/
                    if (jsonDataOb is IDictionary<string, JToken>)
                    {
                        IDictionary<string, JToken> someDyked = (IDictionary<string, JToken>)jsonDataOb;
                    //    WPB("je to jsonTokens dyk, keys:{0}", someDyked.Keys.ToArray().GivmeRow("; "));
                      //  if (someDyked.ContainsKey("type"))                        
                            processProtocoledOb(someDyked, e, relatedHavior);
                        
                    }
                    /*
                     seems indeed covered ba the case above ...
                    else if (jsonDataOb is JObject)
                    {
                        JObject dykovskyOb = (JObject)jsonDataOb;
                        var Keeeys = ((IDictionary<string, JToken>)dykovskyOb).Keys.ToArray();
                        WPB("je to JOOb with keys:{0}", Keeeys.GivMEasOneRow("; "));
                    }
                    */
                    else if (jsonDataOb is IJEnumerable<JToken>)
                    {
                        IJEnumerable<JToken> someHromadaHnedaa = (IJEnumerable<JToken>)jsonDataOb;

                        WPB("je to hromada Sracek:{0}", someHromadaHnedaa.ToArray().GivmeRow("; "));            
                    }
                    else
                    {
                        WPB("je NEhromadne Singularni Lejno:{0}", jsonDataOb.ToString());

                    }
                     
                }
                else
                {
                    WPB("..failed to json prase incoming ws msg.. {0}", txtData);
                }
            }
        }

        public void processProtocoledOb(IDictionary<string, JToken> someDyked, WebSocketSharp.MessageEventArgs e, Lakunda relatedHavior)
        {
            if (someDyked == null || someDyked.Count < 1) return;

            string normatype = "";
            if (someDyked.ContainsKey("type"))
                normatype = someDyked["type"].ToString();
            else
                normatype = "general";

            normatype = normatype.ToLower();
            switch (normatype)
            {
                case "login":
                    {
                        var desiredSlanderName = someDyked["value"].ToString();

                        // check for possible same name login of two diferent users...
                        if (logedWSchatusers.ContainsKey(desiredSlanderName))
                        {
                            if (logedWSchatusers[desiredSlanderName].ID != relatedHavior.ID)
                            {
                                WPA("..!!!!..registering atempt to duplicite login:{0}, of direrent uid:{1}", desiredSlanderName, relatedHavior.ID);
                                // ...however ...it may be because the connected session just stuck hanging there ...
                                // anyway...autorenaming the desired name !!!

                                desiredSlanderName += "_" + kondom.Next(1000, 9999).ToString();
                            }
                        }

                        relatedHavior.UserName = "" + desiredSlanderName;
                        // desiredSlanderName += "_" + relatedHavior.ID;
                        //  .. just reminedr... we NOT using directly the name key for manipulating logedWSchatusers
                        // ..because we dont trust the js client to atempt logout/login by diferent name not related to his websocket. !!

                        string posiblepreviousAlias = null;
                        foreach (var posersPairs in logedWSchatusers)
                        {
                            if (posersPairs.Value.ID == relatedHavior.ID)
                            {
                                posiblepreviousAlias = posersPairs.Key;
                                break;
                            }
                        }

                        if (posiblepreviousAlias != null)
                        {
                            if (logedWSchatusers.ContainsKey(posiblepreviousAlias))
                                logedWSchatusers.Remove(posiblepreviousAlias);
                        }


                        logedWSchatusers.ADuD(desiredSlanderName, relatedHavior);
                        if (vrbosePrint)
                            WPA("ws client login Name:>> {0}, currentTotal users count:{1}", desiredSlanderName, logedWSchatusers.Count);
                   
                        SUFLER_ASN(resyncSrvClientsWithAliasNames);
                        // distrubuteLogedUsersList();

                        replyResponsForOneWSuser_onLogin(someDyked["value"].ToString(), relatedHavior);
                    }
                    break;

                case "logout":
                    {
                        var desiredSlanderName = someDyked["value"].ToString();

                        relatedHavior.UserName = "";        // << null it

                        //    var moreelegantCodeButUntrustworthy = logedWSchatusers.Keys.FirstOrDefault(jenz => logedWSchatusers[jenz].ID == relatedHavior.ID);
                        // ..so lets still do it folowing primitive way...
                        //  .. just reminedr... we NOT using directly the name key for manipulating logedWSchatusers
                        // ..because we dont trust the js client to atempt logout/login by diferent name not related to his websocket. !!

                        string posiblepreviousAlias = null;
                        foreach (var posersPairs in logedWSchatusers)
                        {
                            if (posersPairs.Value.ID == relatedHavior.ID)
                            {
                                posiblepreviousAlias = posersPairs.Key;
                                break;
                            }
                        }

                        if (posiblepreviousAlias != null)
                        {
                            if (logedWSchatusers.ContainsKey(posiblepreviousAlias))
                                logedWSchatusers.Remove(posiblepreviousAlias);
                        }

                        if (vrbosePrint)
                            WPA("ws client Name:>> {0} LOGout, currentTotal users count:{1}", desiredSlanderName, logedWSchatusers.Count);
                        
                        SUFLER_ASN(resyncSrvClientsWithAliasNames);
                    }
                    break;

                case "general":
                    {

                    } break;

                case "txtmsg":
                case "broadcast":
                    {
                        var mostImportanteTeroristicStatement = someDyked["value"].ToString();
                        var cursedNameOfBullshitPusher = "";
                        if (someDyked.ContainsKey("name"))
                            cursedNameOfBullshitPusher = someDyked["name"].ToString();
                        // if name passed from js... then lets check if same as in client instance...
                        // because when adjusting uniquity of the instance name during login when duplicite names passed..
                        if (cursedNameOfBullshitPusher != "")
                        {
                            if (relatedHavior.UserName != cursedNameOfBullshitPusher)
                            {
                                WPA("during broadcast from js ws came name:{0}, while relatedHavior name:{1}", cursedNameOfBullshitPusher, relatedHavior.UserName);
                                if (relatedHavior.UserName.isNOTNullOrEmpty())
                                    cursedNameOfBullshitPusher = relatedHavior.UserName;
                            }
                        }

                        oneWSuserBroadCastToOthers(mostImportanteTeroristicStatement, cursedNameOfBullshitPusher, relatedHavior);
                    }
                    break;

                case "chat":
                    {
                        var mostImportanteTeroristicStatement = someDyked["value"].ToString();
                        var cursedNameOfBullshitPusher = "";
                        var targetVictimOfVerbalTerror = "";

                        if (someDyked.ContainsKey("name"))
                            cursedNameOfBullshitPusher = someDyked["name"].ToString();

                        if (someDyked.ContainsKey("targetname"))
                            targetVictimOfVerbalTerror = someDyked["targetname"].ToString();
                        if (logedWSchatusers.ContainsKey(targetVictimOfVerbalTerror))
                        {
                            oneWSuserTextingOneOther("chat", mostImportanteTeroristicStatement, relatedHavior, logedWSchatusers[targetVictimOfVerbalTerror]);
                        }
                        else
                        {
                            respndOneUser("chat", "desired user:" + targetVictimOfVerbalTerror + " is not aviable", relatedHavior, null);

                        }
                    }
                    break;

                case "eval":
                    {
                        var PoisonToshare = someDyked["value"].ToString();
                        var originNameTobeSpared = someDyked["name"].ToString();
                        var targetNameOrAll = someDyked["targetname"].ToString();

                        if (targetNameOrAll.isNullOrEmpty())
                        {
                            foreach (Lakunda srvSejsna in wsskunda.WebSocketServices["/kunda"].Sessions.Sessions)
                            {
                                if(srvSejsna.UserName != originNameTobeSpared)
                                    srvSejsna.Seend(e.Data); 
                            }
                        }
                        else
                        {
                            foreach (Lakunda srvSejsna in wsskunda.WebSocketServices["/kunda"].Sessions.Sessions)
                            {
                                if (srvSejsna.UserName == targetNameOrAll)
                                {
                                    
                                    srvSejsna.Seend_ASN(e.Data);
                                    break;
                                }
                            }
                        }
                    }
                    break;

                    // function very dangerous ...most likely useles...just kind of for fun...
                case "refexe":
                    {

                        SUFLER_ASN(LittleReflexing, someDyked, relatedHavior);
                    }
                    break;


                    // rtc stuff
                case "candidate":
                    {
                        //  var targetNameOrAll = someDyked["targetname"].ToString();

                        oneWSuserSendingRTCstuffToOneOther(normatype, someDyked, e, relatedHavior);
                    }
                    break;
                case "offer":
                    {
                        oneWSuserSendingRTCstuffToOneOther(normatype, someDyked, e, relatedHavior);
                    }
                    break;
                case "answer":
                    {
                        oneWSuserSendingRTCstuffToOneOther(normatype, someDyked, e, relatedHavior);
                    }
                    break;


                default:
                    {
                        oneWSuserSendingRTCstuffToOneOther(normatype, someDyked, e, relatedHavior);
                    }
                    break;
            }
        }

        public void LittleReflexing(IDictionary<string, JToken> someDyked, Lakunda relatedHavior)
        {
            var originNameTobeSpared = someDyked["name"].ToString();
            var combedExpression = someDyked["value"].ToString();

            var instancename = someDyked["instancename"].ToString();
            var funcname = someDyked["funcname"].ToString();
            var posrans = someDyked["posrans"];    // letsay pairs of "string+boooring int+17";  ..but it should come ar arr of pairs...


            var mlaskTyp = this.GetType();
            // vufagy
            var allMambry = mlaskTyp.GetMembers(vufagy);
            
            var uziVyber = allMambry.Where(those => those.Name.Equals(funcname, StringComparison.InvariantCultureIgnoreCase));
            if (uziVyber == null || uziVyber.Count() < 1)
                uziVyber = allMambry.Where(those => those.Name.IndexOf(funcname, StringComparison.InvariantCultureIgnoreCase) > -1);

            if (uziVyber == null || uziVyber.Count() < 1)
            {
                WPA("LittleReflexing cannon find deisred:{0}", funcname);
                return;
            }

            MethodInfo[] posiblemetots = null;
            var arrofUzsich = uziVyber.ToArray();
            object[] fuparams = null;

            if (posrans != null)
            {
                if (posrans.HasValues)
                {
                    List<object> predparamsObs = new List<object>();
                    foreach (var onepayr in posrans)
                    {
                        var txtPair = onepayr.ToString();
                        if (!txtPair.Contains("+"))
                            predparamsObs.Add(txtPair);
                        else
                        {
                            var typAval = txtPair.Splyte('+');
                            predparamsObs.Add(typAval[1]);
                        }
                    }
                    fuparams = predparamsObs.ToArray();
                }
            }

            //var jenFuchtleTedy = arrofUzsich.Where(jentaci => jentaci.MemberType == MemberTypes.Method);
            var jenFuchtleTedy = arrofUzsich.Where(jentaci => jentaci is MethodInfo);
            if (jenFuchtleTedy != null && jenFuchtleTedy.Count() > 0)
                posiblemetots = jenFuchtleTedy.Select(namitku => (MethodInfo)namitku).ToArray();
            else
            {
                WPA("reflexing like that ..not implemented...");
                return;
            }

            if (posiblemetots != null && posiblemetots.Length > 0)
            {
                var jenTaprvni = posiblemetots[0];


                try
                {
                    jenTaprvni.Invoke(this, fuparams);
                    if (vrbosePrint)
                        WPA("Done reflexive execute of >> {0} done", jenTaprvni.Name);
                }
                catch (Exception rex)
                {
                    WPA("reflexive execute failed >> {0}", rex.Message);
                }
            }


        }

        /// <summary>
        /// ment as respond packet dor js user login procedure...
        /// for purpose of the client actualy know his desired name is not aviable and ramdomized is asigned
        /// it has influence on broadcast msgs in logwindow...
        /// </summary>
        /// <param name="originalyDesiredNameFromUser"></param>
        /// <param name="resultingAsignedName"></param>
        /// <param name="relatedHavior_target"></param>
        public void replyResponsForOneWSuser_onLogin(string originalyDesiredNameFromUser , Lakunda relatedHavior)
        {
            if (relatedHavior == null) return;
            string resultingAsignedName = relatedHavior.UserName;
            normOb krabicehoven = new normOb();
            krabicehoven.type = "login";
            krabicehoven.value = "OK";  // ..letsay there will be some status...letsay in future we may implement actual accounts loging... then it will come handy
            krabicehoven.name = relatedHavior.UserName;     // possible slightly randomized name ..if duplicite founded..
            var posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);
            relatedHavior.Seend(posranedPack);
        }
        public void oneWSuserTextingOneOther(string taskref, string curentlyPushedText, Lakunda relatedHavior_source, Lakunda relatedHavior_target)
        {
            if (relatedHavior_target == null) return;
            normOb krabicehoven = new normOb();
            krabicehoven.type = taskref;
            krabicehoven.value = curentlyPushedText;
            krabicehoven.name = relatedHavior_source.UserName;
            krabicehoven.targetname = relatedHavior_target.UserName;

            var posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);
            relatedHavior_target.Seend(posranedPack);

            // ...we may send back to source that his message was finnaly relayed ...but not for now..
            krabicehoven.type = "response";
            krabicehoven.name = taskref;
            krabicehoven.value = "-sended-";
            posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);
            if (relatedHavior_source != null)
                relatedHavior_source.Seend(posranedPack);
        }
        public void respndOneUser(string referedToOriginalTask, string respondingText, Lakunda relatedHavior_source, Lakunda relatedHavior_target)
        {
            if (relatedHavior_source == null) return;
            normOb krabicehoven = new normOb();
            krabicehoven.type = "response";
            krabicehoven.value = respondingText;
            krabicehoven.name = referedToOriginalTask;

            var posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);

            relatedHavior_source.Seend(posranedPack);

            if (relatedHavior_target != null)
                relatedHavior_target.Seend(posranedPack);
        }

        public void oneWSuserBroadCastToOthers(string textTosend, string cursedNameOfBullshitPusher, Lakunda relatedHavior)
        {
            normOb krabicehoven = new normOb();
            krabicehoven.type = "txtmsg";
            krabicehoven.value = textTosend;
            krabicehoven.name = cursedNameOfBullshitPusher;
            krabicehoven.relatedipoint = relatedHavior.uuserEndPoint.ToString();
            krabicehoven.clientSrvID = relatedHavior.ID;

            var posranedPack = JsonConvert.SerializeObject(krabicehoven,Formatting.None);

            BroadChlastToAllWS(posranedPack);
        }

        public void distrubuteLogedUsersList()
        {
            var serverClientsIdes = wsskunda.WebSocketServices["/kunda"].Sessions.IDs.ToArray();
            var partizanedListKeys = logedWSchatusers.Keys.ToArray();

            var partizanedList = partizanedListKeys.GivMEasOneRow(";");

            if (serverClientsIdes.Length != partizanedListKeys.Length)
            {
                //  WPA("heErr ... soft clients list count:{0}, does NOT ewal server sessions count:{1}", partizanedListKeys.Length, serverClientsIdes.Length);
                // ...as it is now ... the connected wsock user may not be yet loged...so ..
                if (vrbosePrint)
                    WPA("heErr ...difr between loged users count:{0}, connected users count:{1}", partizanedListKeys.Length, serverClientsIdes.Length);
            }

            normOb krabicehoven = new normOb();
            krabicehoven.type = "userslist";
            krabicehoven.value = partizanedList;
            krabicehoven.name = null;                 

            var posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);

            BroadChlastToAllWS(posranedPack);
        }

        public void resyncSrvClientsWithAliasNames()
        {
            if (wsskunda == null) return;

            Dictionary<string, Lakunda> tmpusersList = new Dictionary<string, Lakunda>();
            foreach (Lakunda srvSejsna in wsskunda.WebSocketServices["/kunda"].Sessions.Sessions)
            {
                // ...if user didn log in under particular name...the name is default = ""
                if (srvSejsna.UserName.isNOTNullOrEmpty())
                {
                    tmpusersList.ADuD(srvSejsna.UserName, srvSejsna);
                    if (vrbosePrint)
                        WPB("ws loged user: {0}  uid:{1}", srvSejsna.UserName, srvSejsna.ID);
                }
                else
                {
                    if (vrbosePrint)
                        WPB("ws NOTloged user: {0} >> {1}", srvSejsna.ID, srvSejsna.uuserEndPoint);
                }
            }
            lock (semaforingProtectorForLogedWSdyk)
            {
                logedWSchatusers = new Dictionary<string, Lakunda>(tmpusersList);
            }

            distrubuteLogedUsersList();
        }

        public object semaforingProtectorForLogedWSdyk = new object();
        public Dictionary<string, Lakunda> logedWSchatusers = new Dictionary<string, Lakunda>();


        #region  RTChandlingMethods

        //  combo for sendin candidates, offers, answears
        public void oneWSuserSendingRTCstuffToOneOther(string referedTask, IDictionary<string, JToken> someDyked, WebSocketSharp.MessageEventArgs e, Lakunda relatedHavior_source)
        {
            if (relatedHavior_source == null) return;        
            if(referedTask.isNullOrEmpty())
                referedTask = someDyked["type"].ToString();
            if (!someDyked.ContainsKey("targetname"))
            {
                WPA("desired task:{0}, does NOT have targetname !!!!!, preData:{1}", referedTask, e.Data);               
                return;
            }

            string targetUserName = someDyked["targetname"].ToString();

            if (logedWSchatusers.ContainsKey(targetUserName))
            {

                var relatedHavior_target = logedWSchatusers[targetUserName];

                relatedHavior_target.Seend(e.Data);
                // ...as respons only, otherwise lets resend the whole packet as it came from ws js                 
                normOb krabicehoven = new normOb();

                krabicehoven.type = "response";
                krabicehoven.name = referedTask;// "candidate";
                krabicehoven.value = "-sended-";
                var posranedPack = JsonConvert.SerializeObject(krabicehoven, Formatting.None);
                if (relatedHavior_source != null)
                    relatedHavior_source.Seend(posranedPack);
            }
            else
            {
                WPA("desired user namer:{0} for sending:{1} NOT found !!! ", targetUserName, referedTask);
            }
        }







        #endregion  RTChandlingMethods of...



        public class normOb
        {
            public string type = "general";
            public string name = "I .. the sender";
            public string targetname = null; //"maximrdlan leninovsky";
            public object value = null;
            public string relatedipoint = null;
            public string clientSrvID = null;
         
            public Dictionary<string,object> Xdata = new Dictionary<string,object>();
            
            public normOb() { }
        }





        public Object lastKunda = null;



        public class Lakunda : WebSocketSharp.Server.WebSocketBehavior //, WebSocketSharp.Server.IWebSocketSession
        {
            public const string cipACK = "\x0D\x00\x02\x00\x00";
            public const string cipACKok = "\x0E\x00\x02\x00\x00";
            public string UserName = "";    // when websock client send login under some alias...
            public Lakunda() : base()
            {
                //  Form1.gWPA("...NEW lakunda INstantiated ...");
                // TODO: either here ...or at OnOpen .... prepare slot for this client in users list...
            //    Form1.meForm1.lastKunda = this;
            }

         //   public WebSocketSharp.WebSocket _mwebSocket = null;
            public WebSocketSharp.WebSocket WebSockett
            {
                get
                {

                    // WebSocketSharp.Server.IWebSocketSession.get_WebSocket
                    //   WebSocketSharp.Server.IWebSocketSession WebSocket; //.WebSocket;

                    Type motype = base.GetType().BaseType;
                    //   var tyfilcky = motype.GetFields((BindingFlags)573);
                    // this._websocket = null;
                    // _context

                    var directExactFilc = motype.GetField("_websocket", Form1.meForm1.vufagy);
                    if (directExactFilc != null)
                    {
                        var obtaahlyy = directExactFilc.GetValue(this);
                        if (obtaahlyy != null)
                            return (WebSocketSharp.WebSocket)obtaahlyy;
                    }
                 
                    return null;
                }
                set
                {

                }
            }

            protected override void OnOpen()
            {
                if (vrbosePrint)
                    gWPA("lakunda on ooopen isAlive:{0}, ID:{1}", this.IsAlive, this.ID);
                base.OnOpen();

            //    _mwebSocket = this.WebSockett;
              //  if (_mwebSocket != null)
                //    Form1.gWPA("obtaaahlaa OK :{0}", _mwebSocket);

            }
            protected override void OnClose(WebSocketSharp.CloseEventArgs e)
            {
                // seems this is sadly NOT firing !!!!.....well ..it does.. but not always..
                if (vrbosePrint)
                    gWPA("lakunda on close:{0}", e.Reason);
                Form1.meForm1.SUFLER_ASN(Form1.meForm1.resyncSrvClientsWithAliasNames);

                base.OnClose(e);
            }
            protected override void OnError(WebSocketSharp.ErrorEventArgs e)
            {
                gWPA("lakunda on err:{0}", e.Message);
                base.OnError(e);
            }
            protected override void OnMessage(WebSocketSharp.MessageEventArgs e)
            {
                // base.OnMessage(e);
               

                var recmsg = "";
                if (e.Data != null)
                {
                    recmsg = e.Data;

                    // heartbeat impl... the ticking is expected to WILL do the client..
                    if (e.Data.Length == 5)
                    {
                        // is expected to be cipACK ...but lets check both
                        if (recmsg == cipACK || recmsg == cipACKok)
                        {
                            this.Seend(cipACKok);
                            return;
                        }
                    }
                }

                if (Form1.meForm1 != null)
                {
                    //  var clientEndDupont = (this.UserEndPoint != null ? this.UserEndPoint.ToString() : "-no user Endpoint-");

                    Form1.meForm1.OnWSSincomingMSG(e, this);
                }
            }
            public void Seend(string tosend)
            {
                base.Send(tosend);
            }

            public void Seend_ASN(string tosend)
            {
                base.SendAsync(tosend, new Action<bool>(pakHotofka => { 
                
                }));
            }

            public IPEndPoint uuserEndPoint
            {
                get
                {
                    return this.UserEndPoint;
                }
                set { }
            }

        }





        #endregion websocket devising of....


        // autoclearing textboxes...
        // ...questionn is ...is it worthy??
        int ourMaxlenConst = 65535;
        private void textBoxXX_TextChanged(object sender, EventArgs e)
        {
            // WPA or WPB output box got some ...
            if (sender != null)
            {
                var tenbox = (TextBoxBase)sender;
                //tenbox.MaxLength
                if (tenbox.TextLength > ourMaxlenConst)
                    tenbox.Clear();
            }
        }



    }










    public class SasyMax : System.Net.Security.SslStream
    {
        public override bool IsAuthenticated => base.IsAuthenticated;

        public override bool IsMutuallyAuthenticated => base.IsMutuallyAuthenticated;

        public override bool IsEncrypted => base.IsEncrypted;

        public override bool IsSigned => base.IsSigned;

        public override bool IsServer => base.IsServer;

        public override SslProtocols SslProtocol
        {
            get
            {
                if (this.isDiposed)
                {
                    // Form1.gWPA("..prej jsem saaam dispoooosed .. ");
                    return SslProtocols.Tls12 | SslProtocols.Tls13;
                }
                return base.SslProtocol;
            }            
        }

        public override bool CheckCertRevocationStatus => base.CheckCertRevocationStatus;

        public override X509Certificate LocalCertificate => base.LocalCertificate;

        public override X509Certificate RemoteCertificate => base.RemoteCertificate;

        public override CipherAlgorithmType CipherAlgorithm => base.CipherAlgorithm;

        public override int CipherStrength => base.CipherStrength;

        public override HashAlgorithmType HashAlgorithm => base.HashAlgorithm;

        public override int HashStrength => base.HashStrength;

        public override ExchangeAlgorithmType KeyExchangeAlgorithm => base.KeyExchangeAlgorithm;

        public override int KeyExchangeStrength => base.KeyExchangeStrength;

        public override bool CanSeek => base.CanSeek;

        public override bool CanRead => base.CanRead;

        public override bool CanTimeout => base.CanTimeout;

        public override bool CanWrite => base.CanWrite;

        public override int ReadTimeout { get => base.ReadTimeout; set => base.ReadTimeout = value; }
        public override int WriteTimeout { get => base.WriteTimeout; set => base.WriteTimeout = value; }

        public override long Length => base.Length;

        public override long Position { get => base.Position; set => base.Position = value; }

        public SasyMax(Stream innerstrim) : base(innerstrim)
        {

        }
        public SasyMax(Stream innerstrim, bool leaveinnerStrimOpen) : base(innerstrim, leaveinnerStrimOpen)
        {

        }
        public SasyMax(Stream innerstrim, bool leaveinnerStrimOpen, RemoteCertificateValidationCallback rmtcbck) :
            base(innerstrim, leaveinnerStrimOpen, rmtcbck)
        {

        }

        public SasyMax(Stream innerstrim, bool leaveinnerStrimOpen, RemoteCertificateValidationCallback rmtcbck, LocalCertificateSelectionCallback lclclbk) :
      base(innerstrim, leaveinnerStrimOpen, rmtcbck, lclclbk)
        {

        }
        public SasyMax(Stream innerstrim, bool leaveinnerStrimOpen, RemoteCertificateValidationCallback rmtcbck, LocalCertificateSelectionCallback lclclbk, EncryptionPolicy encpolic) :
     base(innerstrim, leaveinnerStrimOpen, rmtcbck, lclclbk, encpolic)
        {

        }

        public bool isDiposed { get; set; }
        protected override void Dispose(bool disposing)
        {
            this.isDiposed = true;
            base.Dispose(disposing);
        }

        public override Task AuthenticateAsClientAsync(string targetHost)
        {
            return base.AuthenticateAsClientAsync(targetHost);
        }

        public override void AuthenticateAsServer(X509Certificate serverCertificate)
        {
            base.AuthenticateAsServer(serverCertificate);
        }
        public override void AuthenticateAsServer(X509Certificate serverCertificate, bool clientCertificateRequired, SslProtocols enabledSslProtocols, bool checkCertificateRevocation)
        {
            if (Form1.vrbosePrint)
                Form1.gWPA("on AuthenticateAsServer with:{0}, prots:{1}", serverCertificate.Subject, enabledSslProtocols.ToString());
            
            base.AuthenticateAsServer(serverCertificate, clientCertificateRequired, enabledSslProtocols, checkCertificateRevocation);
           // this._SslState.ValidateCreateContext(isServer: true, string.Empty, enabledSslProtocols, serverCertificate, null, clientCertificateRequired, checkCertificateRevocation);
            //this._SslState.ProcessAuthentication(null);
        }

        private System.Reflection.FieldInfo ssfi = null;

        /// <summary>
        /// SslState _SslState
        /// </summary>
        public object _spslState
        {
            get
            {
                object curentlystudej = null;
                if (ssfi == null)
                {
                    var tuzetupee = this.GetType();
                    tuzetupee = tuzetupee.BaseType;
                    //get__sslState
                    System.Reflection.BindingFlags badagas = (System.Reflection.BindingFlags)573;
                    var extraflags = 573 | 0x400 | 0x800 | 0x1000 | 0x2000 | 0x1000000;
                    badagas = ((System.Reflection.BindingFlags)extraflags);

                    ssfi = tuzetupee.GetField("_SslState", badagas);
                    if (ssfi == null)
                    {
                        var mamby = tuzetupee.GetMembers(badagas);
                        var mmmam = mamby.FirstOrDefault(jenz => 
                        jenz.MemberType == System.Reflection.MemberTypes.Field && 
                        jenz.Name.IndexOf("slState", StringComparison.CurrentCultureIgnoreCase) > -1);

                        if (mmmam == null)
                            Form1.gWPA(" >>> failed obtaining SslState >>bastyo:{0} >> {1}", tuzetupee.BaseType, mamby.GivMEasOneRow("\x0D\x0A"));

                    }
                    if (ssfi != null)
                    {
                        curentlystudej = ssfi.GetValue(this);
                    }
                }
                //  return base._SslState;
                return curentlystudej;
            }
            set
            {
                if (ssfi != null && value != null)
                {
                    ssfi.SetValue(this, value);
                }
            }
        }

        public override ObjRef CreateObjRef(Type requestedType)
        {
            return base.CreateObjRef(requestedType);
        }

        public override Task CopyToAsync(Stream destination, int bufferSize, CancellationToken cancellationToken)
        {
            return base.CopyToAsync(destination, bufferSize, cancellationToken);
        }

        public override void Close()
        {
            base.Close();
        }

        public override Task FlushAsync(CancellationToken cancellationToken)
        {
            return base.FlushAsync(cancellationToken);
        }

        [Obsolete]
        protected override WaitHandle CreateWaitHandle()
        {
            // return base.CreateWaitHandle();
            return new ManualResetEvent(false);
        }

        public override Task<int> ReadAsync(byte[] buffer, int offset, int count, CancellationToken cancellationToken)
        {
            return base.ReadAsync(buffer, offset, count, cancellationToken);
        }

        public override Task WriteAsync(byte[] buffer, int offset, int count, CancellationToken cancellationToken)
        {
            return base.WriteAsync(buffer, offset, count, cancellationToken);
        }

        public override int ReadByte()
        {
            return base.ReadByte();
        }

        public override void WriteByte(byte value)
        {
            base.WriteByte(value);
        }

        [Obsolete]
        protected override void ObjectInvariant()
        {
            base.ObjectInvariant();
        
        }

        public override void AuthenticateAsClient(string targetHost)
        {
            base.AuthenticateAsClient(targetHost);
        }

        public override void AuthenticateAsClient(string targetHost, X509CertificateCollection clientCertificates, bool checkCertificateRevocation)
        {
            base.AuthenticateAsClient(targetHost, clientCertificates, checkCertificateRevocation);
        }

        public override void AuthenticateAsClient(string targetHost, X509CertificateCollection clientCertificates, SslProtocols enabledSslProtocols, bool checkCertificateRevocation)
        {
            base.AuthenticateAsClient(targetHost, clientCertificates, enabledSslProtocols, checkCertificateRevocation);
        }

        public override IAsyncResult BeginAuthenticateAsClient(string targetHost, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsClient(targetHost, asyncCallback, asyncState);
        }

        public override IAsyncResult BeginAuthenticateAsClient(string targetHost, X509CertificateCollection clientCertificates, bool checkCertificateRevocation, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsClient(targetHost, clientCertificates, checkCertificateRevocation, asyncCallback, asyncState);
        }

        public override IAsyncResult BeginAuthenticateAsClient(string targetHost, X509CertificateCollection clientCertificates, SslProtocols enabledSslProtocols, bool checkCertificateRevocation, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsClient(targetHost, clientCertificates, enabledSslProtocols, checkCertificateRevocation, asyncCallback, asyncState);
        }

        public override void EndAuthenticateAsClient(IAsyncResult asyncResult)
        {
            base.EndAuthenticateAsClient(asyncResult);
        }

        public override void AuthenticateAsServer(X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation)
        {
            base.AuthenticateAsServer(serverCertificate, clientCertificateRequired, checkCertificateRevocation);
        }

        public override IAsyncResult BeginAuthenticateAsServer(X509Certificate serverCertificate, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsServer(serverCertificate, asyncCallback, asyncState);
        }

        public override IAsyncResult BeginAuthenticateAsServer(X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsServer(serverCertificate, clientCertificateRequired, checkCertificateRevocation, asyncCallback, asyncState);
        }

        public override IAsyncResult BeginAuthenticateAsServer(X509Certificate serverCertificate, bool clientCertificateRequired, SslProtocols enabledSslProtocols, bool checkCertificateRevocation, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginAuthenticateAsServer(serverCertificate, clientCertificateRequired, enabledSslProtocols, checkCertificateRevocation, asyncCallback, asyncState);
        }

        public override void EndAuthenticateAsServer(IAsyncResult asyncResult)
        {
            base.EndAuthenticateAsServer(asyncResult);
        }

        public override Task AuthenticateAsClientAsync(string targetHost, X509CertificateCollection clientCertificates, bool checkCertificateRevocation)
        {
            return base.AuthenticateAsClientAsync(targetHost, clientCertificates, checkCertificateRevocation);
        }

        public override Task AuthenticateAsClientAsync(string targetHost, X509CertificateCollection clientCertificates, SslProtocols enabledSslProtocols, bool checkCertificateRevocation)
        {
            return base.AuthenticateAsClientAsync(targetHost, clientCertificates, enabledSslProtocols, checkCertificateRevocation);
        }

        public override Task AuthenticateAsServerAsync(X509Certificate serverCertificate)
        {
            return base.AuthenticateAsServerAsync(serverCertificate);
        }

        public override Task AuthenticateAsServerAsync(X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation)
        {
            return base.AuthenticateAsServerAsync(serverCertificate, clientCertificateRequired, checkCertificateRevocation);
        }

        public override Task AuthenticateAsServerAsync(X509Certificate serverCertificate, bool clientCertificateRequired, SslProtocols enabledSslProtocols, bool checkCertificateRevocation)
        {
            return base.AuthenticateAsServerAsync(serverCertificate, clientCertificateRequired, enabledSslProtocols, checkCertificateRevocation);
        }

        public override Task ShutdownAsync()
        {
            return base.ShutdownAsync();
        }

        public override void SetLength(long value)
        {
            base.SetLength(value);
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            return base.Seek(offset, origin);
        }

        public override void Flush()
        {
            base.Flush();
        }

        public override int Read(byte[] buffer, int offset, int count)
        {        
            return base.Read(buffer, offset, count);
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            base.Write(buffer, offset, count);
        }

        public override IAsyncResult BeginRead(byte[] buffer, int offset, int count, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginRead(buffer, offset, count, asyncCallback, asyncState);
        }

        public override int EndRead(IAsyncResult asyncResult)
        {
            return base.EndRead(asyncResult);
        }

        public override IAsyncResult BeginWrite(byte[] buffer, int offset, int count, AsyncCallback asyncCallback, object asyncState)
        {
            return base.BeginWrite(buffer, offset, count, asyncCallback, asyncState);
        }

        public override void EndWrite(IAsyncResult asyncResult)
        {
            base.EndWrite(asyncResult);
        }
    }
    

}