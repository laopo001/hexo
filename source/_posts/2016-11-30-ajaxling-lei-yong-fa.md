---
title: ajax另类用法
slug: ajaxling-lei-yong-fa
date: 2016-11-30T04:20:03.000Z
date_updated: 2016-11-30T04:20:03.000Z
---

ajax扫描局域网内部主机端口，发送ajax请求到80，或者557等端口。如果立马返回错误，说明端口存活，超时说明没有打开端口。

> 代码如下

    		function run(callback){
    		//////////////////////////////////////////////////////////////
    		///修改
    		function cTreeNode(sNodeName, sIconURL) {
    			this.sNodeName=sNodeName;
    			this.sIconURL=sIconURL;
    		
    		};
    		cTreeNode.prototype.setName = function cTreeNode_setName(sNewName) {
    			this.sNodeName = sNewName;
    		};
    		cTreeNode.prototype.setIcon = function cTreeNode_setName(sIconURL) {
    			this.sIconURL=sIconURL;
    		};
    		//var i=0;
    		cTreeNode.prototype.appendChild = function cTreeNode_appendChild(oChildTreeNode) {
    			
    			this[oChildTreeNode.sNodeName]=oChildTreeNode;
    			//i++;
    			oChildTreeNode.parent=this;
    			return oChildTreeNode;
    		};
    		cTreeNode.prototype.remove = function cTreeNode_remove() {
    			
    			for(var x in this.parent){
    				
    				if(this.parent[x]===this){
    					delete this.parent[x];
    				}
    			}
    		
    		};
    		
    		
    		//////////////////////////////////////////////////////////
    		function fGetIPAddresses(oIFrame, fSuccessCallback, fErrorCallback) {
    			//<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
    			function fcGetRTCPeerConnection(oWindow) {
    				return oWindow && (oWindow.RTCPeerConnection || oWindow.mozRTCPeerConnection || oWindow.webkitRTCPeerConnection);
    			}
    			var cRTCPeerConnection = fcGetRTCPeerConnection(window) || fcGetRTCPeerConnection(oIFrame.contentWindow);
    			if(!cRTCPeerConnection) {
    				fErrorCallback("RTCPeerConnection feature not available");
    				return;
    			};
    
    			var oRTCPeerConnection = new cRTCPeerConnection({
    				"iceServers": [{
    					"urls": "stun:stun.services.mozilla.com"
    				}, ]
    			}, {
    				"optional": [{
    					"RtpDataChannels": true
    				}, ]
    			});
    
    			dsIPAddresses = {};
    			oRTCPeerConnection.onicecandidate = function fRTCPeerConnectionIceEventHandler(oRTCPeerConnectionIceEvent) {
    				var oRTCIceCandidate = oRTCPeerConnectionIceEvent.candidate;
    				if(oRTCIceCandidate) {
    					var asCandidate = oRTCIceCandidate.candidate.split(" ");
    					if(asCandidate[7] == "host") {
    						var sIPAddress = asCandidate[4];
    						if(/[0-9]{1,3}(?:\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7}/.exec(sIPAddress)) {
    							dsIPAddresses[sIPAddress] = 1;
    						} else {
    						//	console.log("Ignored RTCIceCandidate " + JSON.stringify(oRTCIceCandidate.candidate) + ": not an IP address.");
    						};
    					} else {
    					//	console.log("Ignored RTCIceCandidate " + JSON.stringify(oRTCIceCandidate.candidate) + ": not a \"host\".");
    					};
    				} else {
    					fSuccessCallback(Object.keys(dsIPAddresses));
    				};
    			};
    
    			oRTCPeerConnection.createDataChannel("");
    			oRTCPeerConnection.createOffer(
    				function fCreateOfferSuccess(oRTCSessionDescription) {
    					oRTCPeerConnection.setLocalDescription(
    						oRTCSessionDescription,
    						function fSetLocalDescriptionSuccess() {},
    						function fSetLocalDescriptionError(sErrorMessage) {
    							fErrorCallback("Could not set local description: " + sErrorMessage);
    						}
    					);
    				},
    				function fCreateOfferError(sErrorMessage) {
    					fErrorCallback("Could not create offer: " + sErrorMessage);
    				}
    			);
    		};
    		///////////////////////////////////////////////////////
    		function fXHRScanIPAddressPorts(sIPAddress, auPortNumbers,oTreeNode, fCallback) {
    			var auDetectedPorts = [];
    			(function fLoop() {
    				if(auPortNumbers.length) {
    					var uPortNumber = auPortNumbers.pop(),
    						oXHR = new XMLHttpRequest(),
    						bFinished = false,
    						oTimeout = setTimeout(function fXHRTimeout() {
    							if(!bFinished) {
    								bFinished = true;
    								oXHR.abort();
    								fLoop();
    							};
    						}, 1500);
    					oXHR.onreadystatechange = function fXHRReadyStateChangeEventHandler(oEvent) {
    						if(oXHR.readyState == 4 && !bFinished) {
    							bFinished = true;
    							clearTimeout(oTimeout);
    							auDetectedPorts.push(uPortNumber);
    							fLoop();
    						};
    					};
    					oXHR.open("GET", location.protocol + "//" + sIPAddress + ":" + uPortNumber);
    					oXHR.send();
    				} else {
    				//	console.log("IP: " + sIPAddress + ", ports: " + (auDetectedPorts.join(", ") || "none"));
    					oTreeNode.ports=auDetectedPorts.join(", ") || null;
    					fCallback(auDetectedPorts);
    				};
    			})();
    		};
    		///////////////////////////////////////////////////
    		function fuIPAddress(sIPAddress) {
    			var asComponents = /([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.exec(sIPAddress);
    			if(!asComponents) throw new TypeError("Invalid IPv4 address " + sIPAddress);
    			var uIPAddress = 0;
    			for(var uByte = 0; uByte < 4; uByte++) {
    				uIPAddress = (uIPAddress << 8) + parseInt(asComponents[uByte + 1]); // no sanity checks!
    			};
    			return uIPAddress;
    		};
    
    		function fsIPAddress(uIPAddress) {
    			var asIPAddress = [];
    			for(var uByte = 0; uByte < 4; uByte++) {
    				asIPAddress[uByte] = ((uIPAddress >> (24 - uByte * 8)) & 0xFF).toString();
    			};
    			return asIPAddress.join(".");
    		};
    		////////////////////////////////////////////
    
    		function fScanNetworksForIPAddresses(asIPAddresses, fCallback) {
    			(function fScanNetworksForIPAddressesLoop() {
    				if(asIPAddresses.length != 0) {
    					return fScanNetwork(asIPAddresses.shift(), fScanNetworksForIPAddressesLoop);
    				};
    				fCallback();
    			})();
    		};
    		var oNetworkTreeNode;
    		
    		function fScanNetwork(sIPAddress, fCallback) {
    			oNetworkTreeNode = new cTreeNode("Determining subnet for " + sIPAddress + "...", "scanning.svg"),
    				uIPAddress = fuIPAddress(sIPAddress);
    			//root=oNetworkTreeNode.oRootElement;
    			fGetNetworkSubnetPrefixLength(uIPAddress, oNetworkTreeNode, function(uPrefixLength) {
    				oNetworkTreeNode.setName("Scanning network " + sIPAddress + "/" + uPrefixLength + "...")
    				var uBitMask = -(1 << (32 - uPrefixLength)),
    					uAllOnes = (1 << (32 - uPrefixLength)) - 1,
    					uStartIPAddress = uIPAddress & uBitMask,
    					uEndIPAddress = uIPAddress | uAllOnes,
    					uCurrentIPAddress = uStartIPAddress + 1,
    					uScansStarted = 0,
    					uScansFinished = 0;
    
    				function fScanIPAddressThread() {
    					uScansStarted++;
    					if(uCurrentIPAddress != uEndIPAddress) {
    						var sCurrentIPAddress = fsIPAddress(uCurrentIPAddress);
    						if(uCurrentIPAddress == uIPAddress) {
    							oTreeNode = oNetworkTreeNode.appendChild(new cTreeNode(sCurrentIPAddress + " (you)", "machine.svg"));
    							fScanIPAddress(uCurrentIPAddress++, oTreeNode, fScanIPAddressThread);
    						} else {
    							oTreeNode = oNetworkTreeNode.appendChild(new cTreeNode(sCurrentIPAddress, "scanning.svg"));
    							fScanIPAddress(uCurrentIPAddress++, oTreeNode, fScanIPAddressThread);
    						};
    						return;
    					};
    					oNetworkTreeNode.setName("Network " + sIPAddress + "/" + uPrefixLength)
    					oNetworkTreeNode.setIcon("network.svg")
    					uScansFinished++;
    
    					if(uScansFinished==64){
    						for(var x in oNetworkTreeNode){
    							delete	oNetworkTreeNode[x].parent
    						}
    						callback(oNetworkTreeNode);
    					}
    					if(uScansStarted == uScansFinished) {
    						fCallback();
    					};
    				};
    				for(var uThreads = 64; uThreads--;) setTimeout(fScanIPAddressThread);
    			});
    		};
    
    		function fGetNetworkSubnetPrefixLength(uIPAddress, oNetworkTreeNode, fCallback) {
    			// Attempting to make an XHR to the broadcast address will result in an immediate error. Attempting to make an
    			// XHR to an unused IP address will result in a time-out. We'll start with a large prefix and try increasingly
    			// smaller ones to look for potential broadcast addresses using this timing difference. An IP address can also
    			// be in-use by a *nix machine, which will also result in an immediate error. In an attempt to distinguish
    			// between these two, try the next smaller prefix as well: if that fails, assume the former prefix is right and
    			// return. Obviously this is not perfect, but it seems to work well enough.
    			var uPrefixLength = 26,
    				bBroadcastAddressMayHaveBeenFound = false,
    				oTreeNode = oNetworkTreeNode.appendChild(new cTreeNode("", "scanning.svg"));
    			(function fTestPrefixLength() {
    				if(uPrefixLength >= 16) {
    					var uAllOnes = (1 << (32 - uPrefixLength)) - 1,
    						sBroadcastIPAddress = fsIPAddress(uIPAddress | uAllOnes);
    					oTreeNode.setName("Testing potential broadcast address " + sBroadcastIPAddress + " (/" + uPrefixLength + ")...");
    					fXHRScanIPAddressPorts(sBroadcastIPAddress, [2], oTreeNode,function(auDetectedPortNumbers) {
    						if(auDetectedPortNumbers.length > 0) {
    							// This IP address results in an immediate error. It may be the broadcast address.
    							if(uPrefixLength == 16) {
    								// We won't try to scan larger networks: use this.
    								oTreeNode.remove();
    								return fCallback(uPrefixLength);
    							};
    							bBroadcastAddressMayHaveBeenFound = true;
    							// Try the next: in most setups this should fail if we just found the broadcast address.
    							uPrefixLength--;
    							return fTestPrefixLength();
    						};
    						if(!bBroadcastAddressMayHaveBeenFound) {
    							// This IP address is not used, nor was the previously tested one: try the next.
    							uPrefixLength--;
    							return fTestPrefixLength();
    						};
    						// This IP address is not used, so the previous one is probably the broadcast address.
    						oTreeNode.remove();
    						fCallback(uPrefixLength + 1);
    					});
    					return;
    				};
    				oTreeNode.setName("Could not determine subnet, assuming /24...");
    				oTreeNode.setIcon("error.svg");
    				fCallback(8);
    			})();
    		};
    
    		function fScanIPAddress(uIPAddress, oMachineTreeNode, fCallback) {
    			var sIPAddress = fsIPAddress(uIPAddress);
    			oMachineTreeNode.setName(sIPAddress);
    			oMachineTreeNode.setIcon("scanning.svg");
    			// check if machine responds on the SMB/RDP ports, which both Windows and *nix machines might.
    			
    		//	if(ipArr==null){
    				ipArr= [80, 443, 445, 3389]
    			//}
    			///////////////////////////////////////////////
    			fXHRScanIPAddressPorts(sIPAddress, ipArr, oTreeNode,function(auDetectedPortNumbers) {
    				// no response on this port: assume IP address not in use.
    				if(auDetectedPortNumbers.length == 0) {
    					oMachineTreeNode.remove();
    					return fCallback();
    				};
    				// check if machine responds to other ports that are very unlikely to be in use:
    				fXHRScanIPAddressPorts(sIPAddress, [2], oTreeNode,function(auDetectedPortNumbers) {
    					if(auDetectedPortNumbers.length > 0) {
    						// machine responds to ports that are very unlikely to be in use: probably *nix.
    						oMachineTreeNode.setIcon("machine.svg");
    						return fCallback();
    					};
    					// check again as this is somewhat unreliable:
    					fXHRScanIPAddressPorts(sIPAddress, [3],oTreeNode, function(auDetectedPortNumbers) {
    						if(auDetectedPortNumbers.length > 0) {
    							// machine responds to ports that are very unlikely to be in use: probably *nix.
    							oMachineTreeNode.setIcon("machine.svg");
    						} else {
    							// machine does not appear to respond to ports that are not in use: probably Windows.
    							oMachineTreeNode.setIcon("windows.svg");
    						};
    						fCallback();
    					});
    				});
    			});
    		};
    
    		fGetIPAddresses(
    			window,
    			function fGetIPAddressSuccessCallback(asIPAddresses) {
    				if(asIPAddresses.length == 0) {
    					document.body.appendChild(new cTreeNode("Your local IP address could not be determined.", "error.svg").oRootElement);
    					return;
    				}
    				fScanNetworksForIPAddresses(asIPAddresses, function() {
    					document.title = "Done.";
    					clearInterval(oInterval);
    					document.body.appendChild(new cTreeNode("Scanning took " + fsGetTime() + ".", "info.svg").oRootElement);
    					// done scanning.
    				});
    			},
    			function fGetIPAddressErrorCallback(sErrorMessage) {
    				document.body.appendChild(new cTreeNode(sErrorMessage, "error.svg").oRootElement);
    			}
    		);
    		}
    run(function(data){console.log(data)})
    
