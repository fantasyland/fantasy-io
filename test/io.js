'use strict';

const λ = require('fantasy-check/src/adapters/nodeunit');
const applicative = require('fantasy-check/src/laws/applicative');
const functor = require('fantasy-check/src/laws/functor');
const monad = require('fantasy-check/src/laws/monad');

const helpers = require('fantasy-helpers');
const Identity = require('fantasy-identities');

const {Tuple2} = require('fantasy-tuples');
const {constant, identity} = require('fantasy-combinators');

const IO = require('../fantasy-io');

function run(a) {
    return a.unsafePerform();
}

exports.io = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(IO, run),
    'Identity (Applicative)': applicative.identity(λ)(IO, run),
    'Composition (Applicative)': applicative.composition(λ)(IO, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(IO, run),
    'Interchange (Applicative)': applicative.interchange(λ)(IO, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(IO.of, run),
    'Identity (Functor)': functor.identity(λ)(IO.of, run),
    'Composition (Functor)': functor.composition(λ)(IO.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(IO, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(IO, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(IO, run),
    'Associativity (Monad)': monad.associativity(λ)(IO, run)
};
