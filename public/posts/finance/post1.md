---
title: 'Nonconstant exponential distribustions'
date: '2026-09-08'
---

# continous modelling may be easiest?
- Exponential distrobution pdf = $\lambda e^{-\lambdax}$

## Non-constant Lambda example - to generate generalization:
$$lambda(t) = lambda_0 for t <= t_0$$
$$lambda(t) = lambda_0 + k(t-t_0) for t > t_0$$
=> non homogenous 

\align*{lambda(t) &= P(t <= T < t+dt | T >= t) / dt\\
&= P(t <= T < t+dt) / dt * P( T >= t)\\
&= f(t) / (1-F(t))}
first order diff:
\align*{let U(t) = 1-F(t)\\
= -U'(t)/ U(t)\\
= - (U'(t)/U(t))\\
= - d/dx ln(U(t))}
thus,
\align*{
\int_0^t \lambda(x) dx &= -\int_0^t ln(U(u)) du\\
&= - ln(U(t))\\
&= - ln(1-F(t))\\
&=> 1-F(t) = exp(-\int_0^t \lambda(x)dx)\\
&=> f(t) = \lambda(t) * exp(-\int_0^t \lambda(x)dx)}

but, $lambda(t) = lambda_0 + k(t-t_0)$ for $t > t_0$, so
$\int_0^t \lambda(x) dx = \int_0^t_0 lambda_0 + \int_t_0^t lambda_0 + k(t-t_0)$ for $t > t_0$
$\implies \lambda_0t_0 + (\lambda_0x + \frac12 k(x-t_0)^2)|_{t_0}^t$
$\implies \lambda_0t_0 + \lambda_0(t-t_0) + \frac12 k(t-t_0)^2$

which is a pain!
so the combined function is:
$f(t) = (\lambda(t)) exp(-\lambda_0t - max(\frac12k(t-t_0)^2,0))$
or, better known as,
$f(t) = \lambda(t) exp(-\int_0^x \lambda(t)dt)$
where 
lambda_0 = base rate
t= pulls
t_0 = softpity
k = increase rate

https://thirdorderscientist.org/homoclinic-orbit/2013/6/25/the-darth-vader-rule-mdash-or-computing-expectations-using-survival-functions
https://math.stackexchange.com/questions/919737/darth-vader-rule-what-is-the-reason-for-its-name-and-a-formal-proof

with the survival function of course being 
exp(-\lambda_0t - max(\frac12k(t-t_0)^2,0)); you can do some nonesense to make the t>t_0 case look gaussian
for mean and varience (E(X^2) = \int_0^\inf 2xS(x)dx; see integration by parts )