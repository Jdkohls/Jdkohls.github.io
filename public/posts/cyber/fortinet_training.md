---
title: 'Fortinet Educational Workshop'
date: '2024-04-25'
---

> CISSP Credits: 4

> Threathunting workshop

22mil paid for ransomware by change healthcare.
Law enforcement doesn't like paying ransomware attacks.
Threathunting is meant to catch threats which have entered the organization.

Breaches are able to be identified by preformance issues, leaked data, or inaccessable files. Double extortion is popular- extort customer & extort user.'

3 primary modes of entrance:
- exploiting vulnrebility
- stolen credentials
- social engineering

Outbreak Alerts announcements by fortinet to let the companies know about vulns.
Shadow server is like shodan (I own shodan lifetime subscription)

Indicators of compromise, anomalous activity, and threat intelligence-driven hunting are primary ways to detect malicious activity.

Threat Intelligence-driven Hunting using MiTRE att&ck framework- there is a finite number of tactics, techniques, sub-techniques, etc. that need to be looked for.

We're focusing on `OS dumping` technique, particularly `LSASS process memory`, credentials are saved to `LSASS process memory` depending on how system is accessed.

MITRE ATT&CK framework also gives examples, mitigations and detection. We will be focusing on detection- for instance, if you want to detect `LSASS process memory dumping`, it tells us what we need to monitor.

Fortinet does all of it's monitoring based on the framework- mapping things to the MITRE matrix. Fortinet cloud approximates 60~% vulns originate from removable media. Siem, `Security Information and Event Management` logs all activity, processes it, and finds the issue. EDR, `Endpoint Detection & Response` products detects threats on an endpoint through a similiar methods (ML). Deception is more or less honeypotting. Finally, there is Sandboxing, which is when a sample doesn't match the behavior- so malicousness needs to be verified [Static Analysis -> VM Scan -> Rating -> Intelligence Sharing].

OverView gives... an overview. :3c

### Workshop step by step going on soon.

\~\~\~ ohhohoho \~\~\~


