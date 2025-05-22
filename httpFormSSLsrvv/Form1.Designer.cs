using System.Drawing;
using System.Windows.Forms;

namespace httpFormSSLsrvv
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.Start_Server = new System.Windows.Forms.Button();
            this.Stop_Server = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.button4 = new System.Windows.Forms.Button();
            this.button5 = new System.Windows.Forms.Button();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.button6 = new System.Windows.Forms.Button();
            this.button7 = new System.Windows.Forms.Button();
            this.button8 = new System.Windows.Forms.Button();
            this.button9 = new System.Windows.Forms.Button();
            this.textBox4 = new System.Windows.Forms.TextBox();
            this.checkBox1_vrbos = new System.Windows.Forms.CheckBox();
            this.textBox5_certifPath = new System.Windows.Forms.TextBox();
            this.button10 = new System.Windows.Forms.Button();
            this.button11_SaveSFG = new System.Windows.Forms.Button();
            this.button12_LoadCFG = new System.Windows.Forms.Button();
            this.button11 = new System.Windows.Forms.Button();
            this.textBox5_ip = new System.Windows.Forms.TextBox();
            this.textBox5_port = new System.Windows.Forms.TextBox();
            this.checkBox1_useSSL = new System.Windows.Forms.CheckBox();
            this.checkBox_allowDirBrowse = new System.Windows.Forms.CheckBox();
            this.checkBox_bridge_useSSL = new System.Windows.Forms.CheckBox();
            this.textBox5_bridge_listenPort = new System.Windows.Forms.TextBox();
            this.textBox6_bridge_listenIP = new System.Windows.Forms.TextBox();
            this.button12_bridgeGo = new System.Windows.Forms.Button();
            this.textBox5_bridge_conPort = new System.Windows.Forms.TextBox();
            this.textBox6_bridge_connIP = new System.Windows.Forms.TextBox();
            this.textBox5_clientCert = new System.Windows.Forms.TextBox();
            this.panel1 = new System.Windows.Forms.Panel();
            this.button12_bridgeSTOP = new System.Windows.Forms.Button();
            this.textBox5_clientCRTpass = new System.Windows.Forms.TextBox();
            this.checkBox_fileDumoComs = new System.Windows.Forms.CheckBox();
            this.button12 = new System.Windows.Forms.Button();
            this.button13 = new System.Windows.Forms.Button();
            this.button14 = new System.Windows.Forms.Button();
            this.button15 = new System.Windows.Forms.Button();
            this.button16 = new System.Windows.Forms.Button();
            this.button17 = new System.Windows.Forms.Button();
            this.button18 = new System.Windows.Forms.Button();
            this.button19 = new System.Windows.Forms.Button();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.textBox_CrpcInstaIPaPORT = new System.Windows.Forms.TextBox();
            this.panel2 = new System.Windows.Forms.Panel();
            this.textBox5_portWSS = new System.Windows.Forms.TextBox();
            this.checkBox1_wssYes = new System.Windows.Forms.CheckBox();
            this.button20_ws_start = new System.Windows.Forms.Button();
            this.button20_stop_ws = new System.Windows.Forms.Button();
            this.button20 = new System.Windows.Forms.Button();
            this.button21 = new System.Windows.Forms.Button();
            this.checkBox_autoStartServer = new System.Windows.Forms.CheckBox();
            this.SuspendLayout();
            // 
            // Start_Server
            // 
            this.Start_Server.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.Start_Server.Location = new System.Drawing.Point(9, 8);
            this.Start_Server.Margin = new System.Windows.Forms.Padding(2);
            this.Start_Server.Name = "Start_Server";
            this.Start_Server.Size = new System.Drawing.Size(70, 31);
            this.Start_Server.TabIndex = 0;
            this.Start_Server.Text = "Start Server";
            this.Start_Server.UseVisualStyleBackColor = true;
            this.Start_Server.Click += new System.EventHandler(this.Start_Server_Click);
            // 
            // Stop_Server
            // 
            this.Stop_Server.Enabled = false;
            this.Stop_Server.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.Stop_Server.Location = new System.Drawing.Point(1034, 8);
            this.Stop_Server.Margin = new System.Windows.Forms.Padding(2);
            this.Stop_Server.Name = "Stop_Server";
            this.Stop_Server.Size = new System.Drawing.Size(70, 31);
            this.Stop_Server.TabIndex = 1;
            this.Stop_Server.Text = "Stop";
            this.Stop_Server.UseVisualStyleBackColor = true;
            this.Stop_Server.Click += new System.EventHandler(this.Stop_Server_Click);
            // 
            // textBox1
            // 
            this.textBox1.AcceptsReturn = true;
            this.textBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox1.HideSelection = false;
            this.textBox1.Location = new System.Drawing.Point(9, 53);
            this.textBox1.Margin = new System.Windows.Forms.Padding(2);
            this.textBox1.MaxLength = 9632767;
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.textBox1.Size = new System.Drawing.Size(624, 238);
            this.textBox1.TabIndex = 2;
            this.textBox1.TextChanged += new System.EventHandler(this.textBoxXX_TextChanged);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(208, 12);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 3;
            this.button1.Text = "preloadCert";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(943, 8);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(75, 23);
            this.button2.TabIndex = 4;
            this.button2.Text = "comboCert";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(863, 8);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(75, 23);
            this.button3.TabIndex = 5;
            this.button3.Text = "loadCERT";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // textBox2
            // 
            this.textBox2.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox2.Location = new System.Drawing.Point(636, 53);
            this.textBox2.Margin = new System.Windows.Forms.Padding(2);
            this.textBox2.MaxLength = 9632767;
            this.textBox2.Multiline = true;
            this.textBox2.Name = "textBox2";
            this.textBox2.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.textBox2.Size = new System.Drawing.Size(475, 238);
            this.textBox2.TabIndex = 6;
            // 
            // button4
            // 
            this.button4.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.button4.Location = new System.Drawing.Point(640, 296);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(75, 23);
            this.button4.TabIndex = 7;
            this.button4.Text = "CLR";
            this.button4.UseVisualStyleBackColor = true;
            this.button4.Click += new System.EventHandler(this.button4_Click);
            // 
            // button5
            // 
            this.button5.Location = new System.Drawing.Point(367, 12);
            this.button5.Name = "button5";
            this.button5.Size = new System.Drawing.Size(75, 23);
            this.button5.TabIndex = 8;
            this.button5.Text = "button5";
            this.button5.UseVisualStyleBackColor = true;
            this.button5.Click += new System.EventHandler(this.button5_Click);
            // 
            // textBox3
            // 
            this.textBox3.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox3.Location = new System.Drawing.Point(9, 411);
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(454, 20);
            this.textBox3.TabIndex = 9;
            this.textBox3.Text = "crestron";
            // 
            // button6
            // 
            this.button6.Location = new System.Drawing.Point(286, 12);
            this.button6.Name = "button6";
            this.button6.Size = new System.Drawing.Size(75, 23);
            this.button6.TabIndex = 10;
            this.button6.Text = "prldCert2";
            this.button6.UseVisualStyleBackColor = true;
            this.button6.Click += new System.EventHandler(this.button6_Click);
            // 
            // button7
            // 
            this.button7.Location = new System.Drawing.Point(517, 12);
            this.button7.Name = "button7";
            this.button7.Size = new System.Drawing.Size(30, 23);
            this.button7.TabIndex = 11;
            this.button7.Text = "b7";
            this.button7.UseVisualStyleBackColor = true;
            this.button7.Click += new System.EventHandler(this.button7_Click);
            // 
            // button8
            // 
            this.button8.Location = new System.Drawing.Point(481, 12);
            this.button8.Name = "button8";
            this.button8.Size = new System.Drawing.Size(30, 23);
            this.button8.TabIndex = 12;
            this.button8.Text = "b8";
            this.button8.UseVisualStyleBackColor = true;
            this.button8.Click += new System.EventHandler(this.button8_Click);
            // 
            // button9
            // 
            this.button9.Location = new System.Drawing.Point(445, 12);
            this.button9.Name = "button9";
            this.button9.Size = new System.Drawing.Size(30, 23);
            this.button9.TabIndex = 13;
            this.button9.Text = "b9";
            this.button9.UseVisualStyleBackColor = true;
            this.button9.Click += new System.EventHandler(this.button9_Click);
            // 
            // textBox4
            // 
            this.textBox4.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox4.Location = new System.Drawing.Point(9, 326);
            this.textBox4.Name = "textBox4";
            this.textBox4.Size = new System.Drawing.Size(1094, 20);
            this.textBox4.TabIndex = 14;
            this.textBox4.Text = "wwwPath";
            this.textBox4.TextChanged += new System.EventHandler(this.textBox4_TextChanged);
            this.textBox4.DoubleClick += new System.EventHandler(this.textBox4_DoubleClick);
            // 
            // checkBox1_vrbos
            // 
            this.checkBox1_vrbos.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox1_vrbos.AutoSize = true;
            this.checkBox1_vrbos.Location = new System.Drawing.Point(12, 305);
            this.checkBox1_vrbos.Name = "checkBox1_vrbos";
            this.checkBox1_vrbos.Size = new System.Drawing.Size(82, 17);
            this.checkBox1_vrbos.TabIndex = 15;
            this.checkBox1_vrbos.Text = "vrbose Print";
            this.checkBox1_vrbos.UseVisualStyleBackColor = true;
            this.checkBox1_vrbos.CheckStateChanged += new System.EventHandler(this.checkBox1_vrbos_CheckStateChanged);
            // 
            // textBox5_certifPath
            // 
            this.textBox5_certifPath.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox5_certifPath.Location = new System.Drawing.Point(9, 383);
            this.textBox5_certifPath.Name = "textBox5_certifPath";
            this.textBox5_certifPath.Size = new System.Drawing.Size(906, 20);
            this.textBox5_certifPath.TabIndex = 16;
            this.textBox5_certifPath.Text = "server certifikat";
            this.textBox5_certifPath.DoubleClick += new System.EventHandler(this.textBox5_certifPath_DoubleClick);
            // 
            // button10
            // 
            this.button10.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.button10.Location = new System.Drawing.Point(922, 382);
            this.button10.Name = "button10";
            this.button10.Size = new System.Drawing.Size(75, 23);
            this.button10.TabIndex = 17;
            this.button10.Text = "Load it";
            this.button10.UseVisualStyleBackColor = true;
            this.button10.Click += new System.EventHandler(this.button10_Click);
            // 
            // button11_SaveSFG
            // 
            this.button11_SaveSFG.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button11_SaveSFG.Location = new System.Drawing.Point(9, 596);
            this.button11_SaveSFG.Name = "button11_SaveSFG";
            this.button11_SaveSFG.Size = new System.Drawing.Size(75, 23);
            this.button11_SaveSFG.TabIndex = 18;
            this.button11_SaveSFG.Text = "Save";
            this.button11_SaveSFG.UseVisualStyleBackColor = true;
            this.button11_SaveSFG.Click += new System.EventHandler(this.button11_SaveSFG_Click);
            // 
            // button12_LoadCFG
            // 
            this.button12_LoadCFG.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button12_LoadCFG.Location = new System.Drawing.Point(90, 596);
            this.button12_LoadCFG.Name = "button12_LoadCFG";
            this.button12_LoadCFG.Size = new System.Drawing.Size(75, 23);
            this.button12_LoadCFG.TabIndex = 19;
            this.button12_LoadCFG.Text = "Load";
            this.button12_LoadCFG.UseVisualStyleBackColor = true;
            this.button12_LoadCFG.Click += new System.EventHandler(this.button12_LoadCFG_Click);
            // 
            // button11
            // 
            this.button11.Location = new System.Drawing.Point(116, 12);
            this.button11.Name = "button11";
            this.button11.Size = new System.Drawing.Size(90, 23);
            this.button11.TabIndex = 20;
            this.button11.Text = "extraHeaders";
            this.button11.UseVisualStyleBackColor = true;
            this.button11.Click += new System.EventHandler(this.button11_Click);
            // 
            // textBox5_ip
            // 
            this.textBox5_ip.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox5_ip.Location = new System.Drawing.Point(9, 353);
            this.textBox5_ip.Name = "textBox5_ip";
            this.textBox5_ip.Size = new System.Drawing.Size(158, 20);
            this.textBox5_ip.TabIndex = 21;
            this.textBox5_ip.Text = "0.0.0.0";
            this.textBox5_ip.TextChanged += new System.EventHandler(this.textBox5_ip_TextChanged);
            // 
            // textBox5_port
            // 
            this.textBox5_port.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox5_port.Location = new System.Drawing.Point(226, 353);
            this.textBox5_port.Name = "textBox5_port";
            this.textBox5_port.Size = new System.Drawing.Size(81, 20);
            this.textBox5_port.TabIndex = 22;
            this.textBox5_port.Text = "9999";
            this.textBox5_port.TextChanged += new System.EventHandler(this.textBox5_port_TextChanged);
            // 
            // checkBox1_useSSL
            // 
            this.checkBox1_useSSL.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox1_useSSL.AutoSize = true;
            this.checkBox1_useSSL.Location = new System.Drawing.Point(173, 355);
            this.checkBox1_useSSL.Name = "checkBox1_useSSL";
            this.checkBox1_useSSL.Size = new System.Drawing.Size(52, 17);
            this.checkBox1_useSSL.TabIndex = 23;
            this.checkBox1_useSSL.Text = "https:";
            this.checkBox1_useSSL.UseVisualStyleBackColor = true;
            this.checkBox1_useSSL.CheckStateChanged += new System.EventHandler(this.checkBox1_useSSL_CheckStateChanged);
            // 
            // checkBox_allowDirBrowse
            // 
            this.checkBox_allowDirBrowse.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox_allowDirBrowse.AutoSize = true;
            this.checkBox_allowDirBrowse.Location = new System.Drawing.Point(311, 355);
            this.checkBox_allowDirBrowse.Name = "checkBox_allowDirBrowse";
            this.checkBox_allowDirBrowse.Size = new System.Drawing.Size(130, 17);
            this.checkBox_allowDirBrowse.TabIndex = 24;
            this.checkBox_allowDirBrowse.Text = "allow directory browse";
            this.checkBox_allowDirBrowse.UseVisualStyleBackColor = true;
            this.checkBox_allowDirBrowse.CheckStateChanged += new System.EventHandler(this.checkBox_allowDirBrowse_CheckStateChanged);
            // 
            // checkBox_bridge_useSSL
            // 
            this.checkBox_bridge_useSSL.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox_bridge_useSSL.AutoSize = true;
            this.checkBox_bridge_useSSL.Location = new System.Drawing.Point(267, 539);
            this.checkBox_bridge_useSSL.Name = "checkBox_bridge_useSSL";
            this.checkBox_bridge_useSSL.Size = new System.Drawing.Size(38, 17);
            this.checkBox_bridge_useSSL.TabIndex = 27;
            this.checkBox_bridge_useSSL.Text = "ssl";
            this.checkBox_bridge_useSSL.UseVisualStyleBackColor = true;
            this.checkBox_bridge_useSSL.CheckStateChanged += new System.EventHandler(this.checkBox_bridge_useSSL_CheckStateChanged);
            // 
            // textBox5_bridge_listenPort
            // 
            this.textBox5_bridge_listenPort.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox5_bridge_listenPort.Location = new System.Drawing.Point(176, 539);
            this.textBox5_bridge_listenPort.Name = "textBox5_bridge_listenPort";
            this.textBox5_bridge_listenPort.Size = new System.Drawing.Size(81, 20);
            this.textBox5_bridge_listenPort.TabIndex = 26;
            this.textBox5_bridge_listenPort.Text = "41794";
            // 
            // textBox6_bridge_listenIP
            // 
            this.textBox6_bridge_listenIP.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox6_bridge_listenIP.Location = new System.Drawing.Point(9, 539);
            this.textBox6_bridge_listenIP.Name = "textBox6_bridge_listenIP";
            this.textBox6_bridge_listenIP.Size = new System.Drawing.Size(158, 20);
            this.textBox6_bridge_listenIP.TabIndex = 25;
            this.textBox6_bridge_listenIP.Text = "0.0.0.0";
            // 
            // button12_bridgeGo
            // 
            this.button12_bridgeGo.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button12_bridgeGo.Location = new System.Drawing.Point(561, 535);
            this.button12_bridgeGo.Name = "button12_bridgeGo";
            this.button12_bridgeGo.Size = new System.Drawing.Size(75, 27);
            this.button12_bridgeGo.TabIndex = 28;
            this.button12_bridgeGo.Text = "bridge Start";
            this.button12_bridgeGo.UseVisualStyleBackColor = true;
            this.button12_bridgeGo.Click += new System.EventHandler(this.button12_bridgeGo_Click);
            // 
            // textBox5_bridge_conPort
            // 
            this.textBox5_bridge_conPort.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox5_bridge_conPort.Location = new System.Drawing.Point(475, 539);
            this.textBox5_bridge_conPort.Name = "textBox5_bridge_conPort";
            this.textBox5_bridge_conPort.Size = new System.Drawing.Size(81, 20);
            this.textBox5_bridge_conPort.TabIndex = 30;
            this.textBox5_bridge_conPort.Text = "41796";
            // 
            // textBox6_bridge_connIP
            // 
            this.textBox6_bridge_connIP.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox6_bridge_connIP.Location = new System.Drawing.Point(311, 539);
            this.textBox6_bridge_connIP.Name = "textBox6_bridge_connIP";
            this.textBox6_bridge_connIP.Size = new System.Drawing.Size(158, 20);
            this.textBox6_bridge_connIP.TabIndex = 29;
            this.textBox6_bridge_connIP.Text = "192.168.166.54";
            // 
            // textBox5_clientCert
            // 
            this.textBox5_clientCert.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox5_clientCert.Location = new System.Drawing.Point(9, 565);
            this.textBox5_clientCert.Name = "textBox5_clientCert";
            this.textBox5_clientCert.Size = new System.Drawing.Size(830, 20);
            this.textBox5_clientCert.TabIndex = 31;
            this.textBox5_clientCert.Text = "client certifikat";
            this.textBox5_clientCert.DoubleClick += new System.EventHandler(this.textBox5_clientCert_DoubleClick);
            // 
            // panel1
            // 
            this.panel1.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panel1.Location = new System.Drawing.Point(3, 526);
            this.panel1.Margin = new System.Windows.Forms.Padding(2);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1110, 4);
            this.panel1.TabIndex = 32;
            // 
            // button12_bridgeSTOP
            // 
            this.button12_bridgeSTOP.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button12_bridgeSTOP.Location = new System.Drawing.Point(650, 535);
            this.button12_bridgeSTOP.Name = "button12_bridgeSTOP";
            this.button12_bridgeSTOP.Size = new System.Drawing.Size(75, 27);
            this.button12_bridgeSTOP.TabIndex = 33;
            this.button12_bridgeSTOP.Text = "STOP";
            this.button12_bridgeSTOP.UseVisualStyleBackColor = true;
            this.button12_bridgeSTOP.Click += new System.EventHandler(this.button12_bridgeSTOP_Click);
            // 
            // textBox5_clientCRTpass
            // 
            this.textBox5_clientCRTpass.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox5_clientCRTpass.Location = new System.Drawing.Point(842, 565);
            this.textBox5_clientCRTpass.Name = "textBox5_clientCRTpass";
            this.textBox5_clientCRTpass.Size = new System.Drawing.Size(261, 20);
            this.textBox5_clientCRTpass.TabIndex = 34;
            this.textBox5_clientCRTpass.Text = "client cert pass";
            // 
            // checkBox_fileDumoComs
            // 
            this.checkBox_fileDumoComs.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox_fileDumoComs.AutoSize = true;
            this.checkBox_fileDumoComs.Location = new System.Drawing.Point(741, 541);
            this.checkBox_fileDumoComs.Name = "checkBox_fileDumoComs";
            this.checkBox_fileDumoComs.Size = new System.Drawing.Size(155, 17);
            this.checkBox_fileDumoComs.TabIndex = 35;
            this.checkBox_fileDumoComs.Text = "record forwarded To cache";
            this.checkBox_fileDumoComs.UseVisualStyleBackColor = true;
            this.checkBox_fileDumoComs.CheckStateChanged += new System.EventHandler(this.checkBox_fileDumoComs_CheckStateChanged);
            // 
            // button12
            // 
            this.button12.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button12.Location = new System.Drawing.Point(741, 590);
            this.button12.Name = "button12";
            this.button12.Size = new System.Drawing.Size(68, 23);
            this.button12.TabIndex = 36;
            this.button12.Text = "Dump IT";
            this.button12.UseVisualStyleBackColor = true;
            this.button12.Click += new System.EventHandler(this.button12_Click);
            // 
            // button13
            // 
            this.button13.Location = new System.Drawing.Point(553, 12);
            this.button13.Name = "button13";
            this.button13.Size = new System.Drawing.Size(34, 23);
            this.button13.TabIndex = 37;
            this.button13.Text = "b13";
            this.button13.UseVisualStyleBackColor = true;
            this.button13.Click += new System.EventHandler(this.button13_Click);
            // 
            // button14
            // 
            this.button14.Location = new System.Drawing.Point(590, 9);
            this.button14.Name = "button14";
            this.button14.Size = new System.Drawing.Size(48, 28);
            this.button14.TabIndex = 38;
            this.button14.Text = "crpc C";
            this.button14.UseVisualStyleBackColor = true;
            this.button14.Click += new System.EventHandler(this.button14_Click);
            // 
            // button15
            // 
            this.button15.Location = new System.Drawing.Point(650, 9);
            this.button15.Name = "button15";
            this.button15.Size = new System.Drawing.Size(48, 28);
            this.button15.TabIndex = 39;
            this.button15.Text = "crpc S";
            this.button15.UseVisualStyleBackColor = true;
            this.button15.Click += new System.EventHandler(this.button15_Click);
            // 
            // button16
            // 
            this.button16.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.button16.Location = new System.Drawing.Point(557, 296);
            this.button16.Name = "button16";
            this.button16.Size = new System.Drawing.Size(75, 23);
            this.button16.TabIndex = 40;
            this.button16.Text = "CLR";
            this.button16.UseVisualStyleBackColor = true;
            this.button16.Click += new System.EventHandler(this.button16_Click);
            // 
            // button17
            // 
            this.button17.Location = new System.Drawing.Point(823, 8);
            this.button17.Name = "button17";
            this.button17.Size = new System.Drawing.Size(34, 23);
            this.button17.TabIndex = 41;
            this.button17.Text = "b17";
            this.button17.UseVisualStyleBackColor = true;
            this.button17.Click += new System.EventHandler(this.button17_Click);
            // 
            // button18
            // 
            this.button18.Location = new System.Drawing.Point(783, 8);
            this.button18.Name = "button18";
            this.button18.Size = new System.Drawing.Size(34, 23);
            this.button18.TabIndex = 42;
            this.button18.Text = "b18";
            this.button18.UseVisualStyleBackColor = true;
            this.button18.Click += new System.EventHandler(this.button18_Click);
            // 
            // button19
            // 
            this.button19.Location = new System.Drawing.Point(744, 8);
            this.button19.Name = "button19";
            this.button19.Size = new System.Drawing.Size(34, 23);
            this.button19.TabIndex = 43;
            this.button19.Text = "b19";
            this.button19.UseVisualStyleBackColor = true;
            this.button19.Click += new System.EventHandler(this.button19_Click);
            // 
            // comboBox1
            // 
            this.comboBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.comboBox1.Location = new System.Drawing.Point(762, 298);
            this.comboBox1.Margin = new System.Windows.Forms.Padding(2);
            this.comboBox1.MaxDropDownItems = 12;
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(341, 21);
            this.comboBox1.TabIndex = 44;
            this.comboBox1.SelectionChangeCommitted += new System.EventHandler(this.comboBox1_SelectionChangeCommitted);
            // 
            // textBox_CrpcInstaIPaPORT
            // 
            this.textBox_CrpcInstaIPaPORT.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.textBox_CrpcInstaIPaPORT.Location = new System.Drawing.Point(880, 353);
            this.textBox_CrpcInstaIPaPORT.Name = "textBox_CrpcInstaIPaPORT";
            this.textBox_CrpcInstaIPaPORT.Size = new System.Drawing.Size(225, 20);
            this.textBox_CrpcInstaIPaPORT.TabIndex = 45;
            this.textBox_CrpcInstaIPaPORT.Text = "1:192.168.166.242:50011";
            this.textBox_CrpcInstaIPaPORT.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            // 
            // panel2
            // 
            this.panel2.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.panel2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.panel2.Location = new System.Drawing.Point(6, 446);
            this.panel2.Margin = new System.Windows.Forms.Padding(2);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1110, 4);
            this.panel2.TabIndex = 46;
            // 
            // textBox5_portWSS
            // 
            this.textBox5_portWSS.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.textBox5_portWSS.Location = new System.Drawing.Point(512, 353);
            this.textBox5_portWSS.Name = "textBox5_portWSS";
            this.textBox5_portWSS.Size = new System.Drawing.Size(81, 20);
            this.textBox5_portWSS.TabIndex = 47;
            this.textBox5_portWSS.Text = "9995";
            // 
            // checkBox1_wssYes
            // 
            this.checkBox1_wssYes.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox1_wssYes.AutoSize = true;
            this.checkBox1_wssYes.Location = new System.Drawing.Point(465, 355);
            this.checkBox1_wssYes.Name = "checkBox1_wssYes";
            this.checkBox1_wssYes.Size = new System.Drawing.Size(47, 17);
            this.checkBox1_wssYes.TabIndex = 48;
            this.checkBox1_wssYes.Text = "wss:";
            this.checkBox1_wssYes.UseVisualStyleBackColor = true;
            // 
            // button20_ws_start
            // 
            this.button20_ws_start.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button20_ws_start.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.button20_ws_start.Location = new System.Drawing.Point(6, 452);
            this.button20_ws_start.Margin = new System.Windows.Forms.Padding(2);
            this.button20_ws_start.Name = "button20_ws_start";
            this.button20_ws_start.Size = new System.Drawing.Size(70, 31);
            this.button20_ws_start.TabIndex = 49;
            this.button20_ws_start.Text = "Start WS";
            this.button20_ws_start.UseVisualStyleBackColor = true;
            this.button20_ws_start.Click += new System.EventHandler(this.button20_ws_start_Click);
            // 
            // button20_stop_ws
            // 
            this.button20_stop_ws.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button20_stop_ws.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.button20_stop_ws.Location = new System.Drawing.Point(80, 452);
            this.button20_stop_ws.Margin = new System.Windows.Forms.Padding(2);
            this.button20_stop_ws.Name = "button20_stop_ws";
            this.button20_stop_ws.Size = new System.Drawing.Size(70, 31);
            this.button20_stop_ws.TabIndex = 50;
            this.button20_stop_ws.Text = "STOP ws";
            this.button20_stop_ws.UseVisualStyleBackColor = true;
            this.button20_stop_ws.Click += new System.EventHandler(this.button20_stop_ws_Click);
            // 
            // button20
            // 
            this.button20.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button20.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.button20.Location = new System.Drawing.Point(186, 452);
            this.button20.Margin = new System.Windows.Forms.Padding(2);
            this.button20.Name = "button20";
            this.button20.Size = new System.Drawing.Size(75, 31);
            this.button20.TabIndex = 51;
            this.button20.Text = "send to WS";
            this.button20.UseVisualStyleBackColor = true;
            this.button20.Click += new System.EventHandler(this.button20_Click);
            // 
            // button21
            // 
            this.button21.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.button21.FlatStyle = System.Windows.Forms.FlatStyle.System;
            this.button21.Location = new System.Drawing.Point(267, 452);
            this.button21.Margin = new System.Windows.Forms.Padding(2);
            this.button21.Name = "button21";
            this.button21.Size = new System.Drawing.Size(75, 31);
            this.button21.TabIndex = 52;
            this.button21.Text = "resync users";
            this.button21.UseVisualStyleBackColor = true;
            this.button21.Click += new System.EventHandler(this.button21_Click);
            // 
            // checkBox_autoStartServer
            // 
            this.checkBox_autoStartServer.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.checkBox_autoStartServer.AutoSize = true;
            this.checkBox_autoStartServer.Location = new System.Drawing.Point(367, 460);
            this.checkBox_autoStartServer.Name = "checkBox_autoStartServer";
            this.checkBox_autoStartServer.Size = new System.Drawing.Size(140, 17);
            this.checkBox_autoStartServer.TabIndex = 53;
            this.checkBox_autoStartServer.Text = "AutoStart HTTPS+WSS";
            this.checkBox_autoStartServer.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1122, 625);
            this.Controls.Add(this.checkBox_autoStartServer);
            this.Controls.Add(this.button21);
            this.Controls.Add(this.button20);
            this.Controls.Add(this.button20_stop_ws);
            this.Controls.Add(this.button20_ws_start);
            this.Controls.Add(this.checkBox1_wssYes);
            this.Controls.Add(this.textBox5_portWSS);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.textBox_CrpcInstaIPaPORT);
            this.Controls.Add(this.comboBox1);
            this.Controls.Add(this.button19);
            this.Controls.Add(this.button18);
            this.Controls.Add(this.button17);
            this.Controls.Add(this.button16);
            this.Controls.Add(this.button15);
            this.Controls.Add(this.button14);
            this.Controls.Add(this.button13);
            this.Controls.Add(this.button12);
            this.Controls.Add(this.checkBox_fileDumoComs);
            this.Controls.Add(this.textBox5_clientCRTpass);
            this.Controls.Add(this.button12_bridgeSTOP);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.textBox5_clientCert);
            this.Controls.Add(this.textBox5_bridge_conPort);
            this.Controls.Add(this.textBox6_bridge_connIP);
            this.Controls.Add(this.button12_bridgeGo);
            this.Controls.Add(this.checkBox_bridge_useSSL);
            this.Controls.Add(this.textBox5_bridge_listenPort);
            this.Controls.Add(this.textBox6_bridge_listenIP);
            this.Controls.Add(this.checkBox_allowDirBrowse);
            this.Controls.Add(this.checkBox1_useSSL);
            this.Controls.Add(this.textBox5_port);
            this.Controls.Add(this.textBox5_ip);
            this.Controls.Add(this.button11);
            this.Controls.Add(this.button12_LoadCFG);
            this.Controls.Add(this.button11_SaveSFG);
            this.Controls.Add(this.button10);
            this.Controls.Add(this.textBox5_certifPath);
            this.Controls.Add(this.checkBox1_vrbos);
            this.Controls.Add(this.textBox4);
            this.Controls.Add(this.button9);
            this.Controls.Add(this.button8);
            this.Controls.Add(this.button7);
            this.Controls.Add(this.button6);
            this.Controls.Add(this.textBox3);
            this.Controls.Add(this.button5);
            this.Controls.Add(this.button4);
            this.Controls.Add(this.textBox2);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.Stop_Server);
            this.Controls.Add(this.Start_Server);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "Form1";
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Show;
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button Start_Server;
        private Button Stop_Server;
        private Button button1;
        private Button button2;
        private Button button3;
        public TextBox textBox2;
        private Button button4;
        public TextBox textBox1;
        private Button button5;
        public TextBox textBox3;
        private Button button6;
        private Button button7;
        private Button button8;
        private Button button9;
        public TextBox textBox4;
        public CheckBox checkBox1_vrbos;
        public TextBox textBox5_certifPath;
        private Button button10;
        private Button button11_SaveSFG;
        private Button button12_LoadCFG;
        private Button button11;
        public TextBox textBox5_ip;
        public TextBox textBox5_port;
        public CheckBox checkBox1_useSSL;
        public CheckBox checkBox_allowDirBrowse;
        public CheckBox checkBox_bridge_useSSL;
        public TextBox textBox5_bridge_listenPort;
        public TextBox textBox6_bridge_listenIP;
        private Button button12_bridgeGo;
        public TextBox textBox5_bridge_conPort;
        public TextBox textBox6_bridge_connIP;
        public TextBox textBox5_clientCert;
        private Panel panel1;
        private Button button12_bridgeSTOP;
        public TextBox textBox5_clientCRTpass;
        public CheckBox checkBox_fileDumoComs;
        private Button button12;
        private Button button13;
        private Button button14;
        private Button button15;
        private Button button16;
        private Button button17;
        private Button button18;
        private Button button19;
        public ComboBox comboBox1;
        public TextBox textBox_CrpcInstaIPaPORT;
        private Panel panel2;
        public TextBox textBox5_portWSS;
        public CheckBox checkBox1_wssYes;
        private Button button20_ws_start;
        private Button button20_stop_ws;
        private Button button20;
        private Button button21;
        public CheckBox checkBox_autoStartServer;
    }
}