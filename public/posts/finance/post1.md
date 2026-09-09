---
title: 'Nonconstant exponential distribustions'
date: '2026-09-08'
---

Constant $\lambda$:
- Exponential distrobution pdf = $\lambda e^{-\lambda x}$

## Generalized model
$$
\begin{aligned}
    \lambda(t) &= P(t <= T < t+dt | T >= t)\\
                &= \frac{P(t <= T < t+dt)}{P( T >= t)}\\
                &= \frac{f(t)}{1-F(t)}
\end{aligned}
$$

first order diff:

$$
\begin{aligned}
\text{let } U(t) &= 1-F(t)\\
\implies \lambda(t)&= -U'(t)/ U(t)\\
&= - (U'(t)/U(t))\\
&= - \frac{d}{dx} ln(U(t))
\end{aligned}
$$

thus,

$$
\begin{aligned}
\int_0^t \lambda(x) dx &= - ln(U(u))\\
&= - ln(1-F(t))\\
\implies 1-F(t) &= \exp^{-\int_0^t \lambda(x)dx}\\
\implies f(t) &= \lambda(t) * \exp^{-\int_0^t \lambda(x)dx}
\end{aligned}
$$

### Specific Model

$$
\lambda(t) = 
\begin{cases} 
  \lambda_0 & \text{for } t \leq t_0 \\ 
  \lambda_0 + k(t-t_0) & \text{for } t > t_0 
\end{cases}
$$
=> non homogenous, specifically piecewise.


$$
\begin{aligned}
\int_0^t \lambda(x) dx &= \int_0^{t_0} \lambda_0 dx + \int_{t_0}^t \lambda_0 + k(x-t_0)dx \text{ for } t > t_0\\
&\implies \lambda_0 t_0 + (\lambda_0x + \frac{1}{2} k(x-t_0)^2)|_{t_0}^t\\
&\implies \lambda_0 t_0 + \lambda_0(t-t_0) + \frac{1}{2} k(t-t_0)^2\\
&\implies \lambda_0 t+ \frac{1}{2} k(t-t_0)^2

\end{aligned}
$$

which is a pain!
so the combined function is:

$$
f(t) = \lambda(t) \exp^{-\lambda_0 t - \frac{1}{2}k(t-t_0)_+^2}
$$

or, better known as,
$f(t) = \lambda(t) \exp^{-\int_0^x \lambda(t)dt}$
where 
lambda_0 = base rate
t= pulls
t_0 = softpity
k = increase rate

https://thirdorderscientist.org/homoclinic-orbit/2013/6/25/the-darth-vader-rule-mdash-or-computing-expectations-using-survival-functions

https://math.stackexchange.com/questions/919737/darth-vader-rule-what-is-the-reason-for-its-name-and-a-formal-proof

with the survival function of course being 
$$\exp^{-\int_0^x \lambda(t)dt}$$
; you can do some nonesense to make the t>t_0 case look gaussian
for mean and varience (E(X^2) = \int_0^\inf 2xS(x)dx; see integration by parts )