---
title: Working setup
description: Where we talk, the habits that keep a long session survivable, and the rules for other people's machines and credentials.
sidebar:
  order: 7
---

This is the setup we actually run, with the reasoning attached. The comfort parts
are suggestions — the rules about other people's machines and other people's
credentials are not. It is written down so nobody has to work it out alone, and
so the parts that turn out to be folklore are marked as folklore rather than
repeated.

## Chat

Everything else here is easier with people around, and
[Discord](https://discord.com/invite/4KajkBHaQ) is where they are: questions,
work in progress, what changed this week, and a voice room for pairing. Same
invite as the Discord icon in the header, and it is the "chat" that the
remote-access rules further down refer to.

Three habits make it work:

- **Ask in a channel, not a DM.** The next person to hit the same thing can find
  the answer. In a DM it is gone.
- **Say you are stuck early.** Twenty silent minutes is worse for everyone than
  one question, and nobody is keeping score of who asked.
- **Use the same display name as your GitHub handle,** so a review comment and a
  chat message obviously come from the same person.

## Breaks

Long uninterrupted sessions are where posture, eyes and attention degrade
together, and you rarely notice any of the three until you stop.

The rule worth knowing is **20-20-20**: every 20 minutes, look at something at
least 20 feet (6 m) away for 20 seconds. It targets the actual causes of digital
eye strain — sustained near focus, and a blink rate that drops sharply while you
read a screen.

[Stretchly](https://hovancik.net/stretchly/) automates it: free, open source
(BSD-2-Clause), Windows, macOS and Linux, sits in the tray.

The schedule we use:

| Setting | Value | Why |
| --- | --- | --- |
| Mini break | 20 seconds, every 20 minutes | Matches 20-20-20 |
| Long break | 5 minutes, every 3 mini breaks | Works out to once an hour |
| Strict mode | On, if you skip breaks when busy | Removes the "finish early" link |

:::note[Two things that catch people out]
Stretchly's defaults are 10 and 30 minutes, not 20 and 60 — change both.
And its long-break interval is counted **in mini breaks, not minutes**: with mini
breaks every 20 minutes, an hourly long break is `3`, not `60`.
:::

Any timer works — the schedule matters more than the tool. What does matter is
what you do with the 20 seconds: looking from the editor to your phone is the
same near focus at the same distance, so it does not count.

## Screen and light

Every OS ships a warm-shift mode, no install needed:

- **Windows** — Settings → System → Display → Night light. Schedule it from
  sunset, around 50% strength.
- **macOS** — System Settings → Displays → Night Shift.
- **Linux** — GNOME: Settings → Displays → Night Light. Otherwise Redshift or
  gammastep.

:::caution[It does less than it is credited with]
Night light is a comfort setting, not a treatment. It is worth knowing what the
evidence actually says before you rely on it:

- **It does not fix eye strain.** A Cochrane review of 17 randomised trials found
  blue-light filtering lenses probably make no difference to eye strain, and the
  American Academy of Ophthalmology does not recommend blue-light-blocking
  glasses — there is no evidence that light from screens damages the eyes.
- **It does not reliably fix sleep either.** A trial of iPhone Night Shift found
  no difference in sleep outcomes with it on, with it off, or with no phone at
  all before bed. Among people who were already well rested, not using the phone
  beat both.

What it is genuinely good for is a dim room: a bright cold screen against a dark
wall is jarring, and a warm, dimmer one is easier to sit in front of. Keep it for
that. Just do not expect it to do the other two jobs.
:::

What does help the eyes is unglamorous: take the breaks, blink deliberately,
sit about an arm's length (~65 cm) from the screen with it slightly below eye
level, and match its brightness to the room rather than to the dark.

## Desk

A laptop on its own makes you choose between the screen being too low and your
hands being too high, and over a full day you pay for it in the neck. A stand and
an external keyboard separate the two decisions. It is the cheapest upgrade on
this page.

- Top of the screen at or just below eye level, about an arm's length away.
- Elbows loosely at your sides at roughly a right angle, wrists straight rather
  than bent up over the edge of the desk.
- Feet flat. A box or a stack of books is a footrest.

Then stop optimising. The best posture is the next one, and the break schedule
above does more for you than the chair does.

## Remote access

For pairing, debugging on someone else's setup, or reaching a machine you are not
sitting at.

- **[Chrome Remote Desktop](https://remotedesktop.google.com/support/)** — the
  default choice. Browser extension only, works through firewalls, no
  configuration. Needs a Google account at both ends.
- **[RustDesk](https://rustdesk.com/)** — open source, and the relay can be
  self-hosted so the session does not pass through a third party. More setup.
  Use it for anything touching credentials or private data.

Both put someone else's screen, files and logged-in sessions in front of you, so
the rules matter more than the tool:

1. **Ask in chat and wait for a yes before connecting** — every time, including
   when you have connected before.
2. **The owner stays at the keyboard** and can end the session at any moment.
3. **Tidy the screen before you share it.** Password manager, personal mail and
   private chats closed, not minimised.
4. **Close the session when you are done.** No standing unattended access left
   configured "for next time".
5. **What you see on someone's machine stays there.** It is not yours to repeat,
   screenshot or paste.

## Secrets and accounts

The rest of this page is about lasting the day. This part is about not handing
someone your keys.

**Never paste a credential into chat.** Not a token, not a `.env` file, not a
database URL, not "just for a minute". Deleting the message afterwards does not
un-leak it — it may already sit in someone's notification, a cached client, a
screenshot or a bot log. Share credentials through a password manager
([Bitwarden](https://bitwarden.com/) is open source and free for personal use) or
a one-time secret link, with the one person who needs it.

**Keep them out of the repository in the first place.** Real values in `.env`,
`.env` in `.gitignore`, and a committed `.env.example` listing the keys with
dummy values so the next person knows what to fill in.

:::caution[If a secret does reach a public repository, rotate first]
It is compromised the moment it is pushed. Public event feeds and mirrors see new
commits within seconds, and GitHub itself scans public code for known token
formats.

Rewriting history does not undo that: the old commits stay reachable by their
SHA, and anyone who already cloned or forked still has them. So the order is
**rotate the credential, then clean the history** — never the other way round. A
dead secret in an old commit is a curiosity. A live one is an open door.
:::

**Two-factor authentication on GitHub is not optional** — it has been required
for accounts that contribute code since March 2023. An authenticator app or a
passkey beats SMS. Download the recovery codes and keep them somewhere that is
not the device generating the codes: GitHub Support cannot restore an account
without them.

## Sources

- American Academy of Ophthalmology — [Computers, Digital Devices, and Eye
  Strain](https://www.aao.org/eye-health/tips-prevention/computer-usage)
- American Academy of Ophthalmology — [Should You Be Worried About Blue
  Light?](https://www.aao.org/eye-health/tips-prevention/should-you-be-worried-about-blue-light)
- Singh S. et al. — [Blue-light filtering spectacle lenses for visual
  performance, sleep, and macular health in
  adults](https://www.cochrane.org/evidence/CD013244_blue-light-filtering-spectacle-lenses-visual-performance-macular-back-part-eye-protection-and),
  Cochrane Database of Systematic Reviews, 2023
- Duraccio K.M. et al. — [Does iPhone night shift mitigate negative effects of
  smartphone use on sleep outcomes in emerging
  adults?](https://doi.org/10.1016/j.sleh.2021.03.005), *Sleep Health* 7(4),
  2021
- GitHub Docs — [About two-factor
  authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication)
- GitHub Docs — [About secret
  scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)

Something here out of date or missing? Use the edit link at the foot of the page
and open a pull request.
