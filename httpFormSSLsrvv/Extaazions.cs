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
using Newtonsoft.Json.Linq;

namespace httpFormSSLsrvv
{
    public static class Extaazions
    {


        public static string GivMEasOneRow(this System.Collections.IEnumerable someColection, string disector)
        {
            if (someColection == null) return "";
            if (string.IsNullOrEmpty(disector))
                disector = " ";

            List<string> spouzec = new List<string>();
       
            foreach (var somaar in someColection)
            {
                if (somaar == null)
                    spouzec.Add("-null-");
                else
                    spouzec.Add(somaar.ToString());
            }
            return string.Join(disector, spouzec);
        }

        public static string GivmeRow<T>(this IEnumerable<T> someColection, string disector)
        {
            if (someColection == null) return "";
            if (string.IsNullOrEmpty(disector))
                disector = " ";

            var prekastenyy = someColection.Select(ka => (ka == null ? "-null-" : ka.ToString()));
            return string.Join(disector, prekastenyy);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="someColection"></param>
        /// <param name="disector"></param>
        /// <param name="customFormatExpression">like {0} or {0:X2} </param>
        /// <returns></returns>
        public static string GivmeRow<T>(this IEnumerable<T> someColection, string disector, string customFormatExpression)
        {
            if (someColection == null) return "";
            if (string.IsNullOrEmpty(disector))
                disector = " ";
            if (string.IsNullOrEmpty(customFormatExpression))
                customFormatExpression = "{0}";

            var prekastenyy = someColection.Select(ka => (ka == null ? "-null-" : string.Format(customFormatExpression, ka)));
            return string.Join(disector, prekastenyy);
        }

       // private static OpenFileDialog reusableBOg = null;
        /// <summary>
        /// rets arr of selfiles, or zero len string arraj, never null
        /// </summary>
        /// <param name="bog"></param>
        /// <param name="optionalInitDir"></param>
        /// <returns></returns>
        public static string[] GogCombo(this OpenFileDialog bog, params string[] optionalInitDir)
        {
            if (bog == null)
            {
                bog = new OpenFileDialog();
            }
            bog.Multiselect = true;
            if (optionalInitDir != null && optionalInitDir.Length > 0)
                bog.InitialDirectory = optionalInitDir[0];
            //else
                //bog.InitialDirectory = Directory.GetCurrentDirectory();
            var result = bog.ShowDialog();
            if (result == DialogResult.OK || result == DialogResult.Yes)
            {
                return (bog.FileNames != null ? bog.FileNames : new string[0]);
            }

            return new string[0];
        }

        public static string[] ChoseFiler(params string[] optionalInitDir)
        {
            OpenFileDialog dog = null;
            return dog.GogCombo(optionalInitDir);
        }
        /// <summary>
        /// add or replace
        /// </summary>
        /// <typeparam name="Tk"></typeparam>
        /// <typeparam name="Tv"></typeparam>
        /// <param name="someDyk"></param>
        /// <param name="kukej"></param>
        /// <param name="vaal"></param>
        public static void ADuD<Tk, Tv>(this IDictionary<Tk, Tv> someDyk, Tk kukej, Tv vaal)
        {
            if (someDyk != null && kukej != null)
            {
                if (someDyk.ContainsKey(kukej))
                    someDyk[kukej] = vaal;
                else
                    someDyk.Add(kukej, vaal);
            }
        }

        public static string txtBoxSafeReader(this TextBoxBase toRead)
        {
            if (toRead != null)
            {
                if (toRead.InvokeRequired)
                {
                    object necovratil = toRead.Invoke(new Func<TextBoxBase, string>(txtBoxSafeReader), new object[] { toRead });
                    if (necovratil != null)
                    {
                        if (necovratil is string)
                        {
                            return (string)necovratil;
                        }
                    }
                }
                else
                {
                    if (!string.IsNullOrEmpty(toRead.Text))
                    {
                        return string.Copy(toRead.Text);
                    }
                }
            }
            return null;
        }

        public static void txtBoxSafeWriter(this TextBoxBase toBeWrited, string freshValToputThere)
        {
            if (toBeWrited == null || toBeWrited.IsDisposed) return;
            if (toBeWrited.InvokeRequired)
            {
                toBeWrited.Invoke(new Action<TextBoxBase, string>(txtBoxSafeWriter), new object[] { toBeWrited, freshValToputThere });
            }
            else
            {
                toBeWrited.Text = freshValToputThere;
            }
        }

        /// <summary>
        /// own split, always excluding empyty and null parts,
        /// ALWAYS returns at least arr where 0st el. is original string arr not null, not enumerable directly array
        /// </summary>
        /// <param name="txtToSplit"></param>
        /// <param name="spiters"></param>
        /// <returns>if shit passed, shit returned, otherwise always at lest array whre 0 is original</returns>
        public static string[] Splyte(this string txtToSplit, params char[] spiters)
        {
            if (string.IsNullOrEmpty(txtToSplit)) return new string[] { };

            var prechrchlal = txtToSplit.Split(spiters).Where(kr => !string.IsNullOrEmpty(kr));
            if (prechrchlal != null)
            {
                var hrubota = prechrchlal.ToArray();
                if (hrubota.Length < 1)
                    hrubota = new string[] { txtToSplit };
                return hrubota;
            }
            else
                return new string[] { txtToSplit };
        }

        /// <summary>
        /// resulting either JObject, or JArray, if parsed resu is just Jtoken, it rets JArra with one element
        /// </summary>
        /// <param name="possibleJsonText"></param>
        /// <param name="rezults"></param>
        /// <returns></returns>
        public static bool TriPrase(this String possibleJsonText, out Newtonsoft.Json.Linq.JContainer rezults)
        {
            rezults = null;
            if (possibleJsonText.isNullOrEmpty()) return false;
            try
            {
                possibleJsonText = possibleJsonText.Trim();
                //var tmprezults = Newtonsoft.Json.Linq.JToken.Parse(possibleJsonText);
                var tmprezults = Newtonsoft.Json.Linq.JValue.Parse(possibleJsonText);
                if (tmprezults != null) 
                {
                    if (tmprezults is JContainer)
                    {
                        rezults = (JContainer)tmprezults;
                    }
                    else
                    {
                        if (tmprezults.HasValues)
                        {
                            Form1.gWPA("triparse NO container YER multi collection ? >> {0}", tmprezults);
                            var kapsob = new JArray(tmprezults.ToArray());
                            rezults = kapsob;
                        }
                        else
                        {
                            // then lets assume is single primitve vaala
                            //var kapsob = new JObject();
                            //kapsob.Add("value", tmprezults);
                            var kapsob = new JArray();
                            kapsob.Add(tmprezults);
                            rezults = kapsob;
                        }
                    }
                }
                return (rezults != null);
            }
            catch(Exception ex) 
            {
                if (Form1.vrbosePrint)
                    Form1.gWPA("json TriPrase failed because:{0}", ex.Message);
                return false;
            }                
        }

        /// <summary>
        /// checks null or len below 1
        ///  should be littlebit moore luxury..
        /// </summary>
        /// <param name="txtTocheck"></param>
        /// <returns>true if null or empty or zero len</returns>
        public static bool isNullOrEmpty(this String txtTocheck)
        {
            return (string.IsNullOrEmpty(txtTocheck) || txtTocheck.Length < 1);
        }
        /// <summary>
        /// rets TRUE if null or empty or zero len oposite of IsNullOrEmpty
        /// </summary>
        /// <param name="txtTocheck"></param>
        /// <returns></returns>
        public static bool isNOTNullOrEmpty(this String txtTocheck)
        {
            return (!string.IsNullOrEmpty(txtTocheck) && txtTocheck.Length > 0);
        }

        /// <summary>
        /// it gradualy steps up from curent app dir and search for desired filename
        /// </summary>
        /// <param name="fullFilePathToGoFrom"></param>
        /// <param name="maxJumps"></param>
        /// <param name="possibleLocation"></param>
        /// <returns></returns>
        public static bool ClaimUPandSearchForFile(string fullFilePathToGoFrom, int maxJumps, ref string possibleLocation)
        {
            if (fullFilePathToGoFrom.isNullOrEmpty()) return false;
            if (File.Exists(fullFilePathToGoFrom))
            {
                possibleLocation = fullFilePathToGoFrom;
                return true;
            }

            maxJumps--;
            if (maxJumps < 0) return false;

            var jenFilename = Path.GetFileName(fullFilePathToGoFrom);
            var jenHisResidingDira = Path.GetDirectoryName(fullFilePathToGoFrom);
            var parentovaNora = Directory.GetParent(jenHisResidingDira);

            if(parentovaNora == null) return false;

            var uperPathTocheck = parentovaNora.FullName + "\\" + jenFilename;

            return ClaimUPandSearchForFile(uperPathTocheck, maxJumps, ref possibleLocation);

        }

    }
}
